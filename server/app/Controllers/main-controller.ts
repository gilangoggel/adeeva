import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from "App/Models/Product";
import { sampleSize } from 'lodash'
import voca from 'voca';
import { transactionLoader } from '../Helper/transaction-functions'
import Transaction from "App/Models/Transaction";
import {schema} from "@ioc:Adonis/Core/Validator";
import Comment from "App/Models/Comment";

class MainController {

  checkTransaction = async (session: HttpContextContract['session']) => {
    const has = session.has("transactionId");
    if (! has) return {};
    const model = await Transaction.find((session.get("transactionId")));
    if (! model) return {};
    const statuses = [1,2,3,4,5].map(t=>t.toString()).includes(model.status as string)
    if (statuses){
      session.forget("transactionId");
    }
    await transactionLoader(model);
    return {
      transaction: model
    };
  }

  checkout = async ({inertia, auth, session}: HttpContextContract) => {
    await auth.authenticate();
    await auth.user?.load('profile');
    const {transaction} = await this.checkTransaction(session);
    return inertia.render("checkout", {
      profile: auth.user?.profile,
      transaction: transaction ? transaction : null
    })
  }

  product = async ({inertia, params : {name}}: HttpContextContract) => {
    if (! name){
      return inertia.redirectBack();
    }
    const query = voca(name as string).replaceAll(`_`, ' ').value()
    const product = await Product.query().where('name', 'like', `${query}`).first();
    if (! product){
      return inertia.redirectBack();
    }
    const recomendations = await Product.query()
      .whereNot('id', product.id)
      .where('category', 'like', product.category)
      .limit(5)
    const data = product;
    await product.load("comments", p=>p.orderBy('created_at', 'desc'))
    return inertia.render('product', {
      product : data.serialize(),
      recomendations,
      comments: product.comments.map(item=>item.serialize())
    });
  }

  addComment = async ({ request, auth, params, response }: HttpContextContract) => {
    const input = await request.validate({
      schema: schema.create({
        content: schema.string(),
        rating: schema.number(),
        username: schema.string()
      })
    });
    const product = await Product.find(params.id);
    if (! product) return response.abort({}, 404);
    if (auth.user){
      Object.assign(input,{
        user_id: auth.user.id
      })
    }
    Object.assign(input,{
      product_id : product.id
    })
    const comment = await Comment.create(input);

    return comment.serialize()
  }

  public getHighlightProduct = async ({ session }: HttpContextContract) => {
    const name = 'hightlight-product';
    const preserve = session.get(name);
    if (!preserve){
      const products = await Product.all();
      const items = sampleSize(products, 6);
      await session.put(name, items.map(item=>item.id))
      return items;
    }
    if (preserve.length  === 2){
      await session.forget(name)
      return this.getHighlightProduct({session} as any)
    }
    return Product.query().whereIn('id', preserve)
  }

  public getProductQuery = async ({}: HttpContextContract) => {
    return Product.query().limit(12)
  }

  private getMode = ({ route }: HttpContextContract) => {
    // @ts-ignore
    if ((route.name as string) === "home"){
      return 'list'
    }
    return "paginate";
  }


  private makeQuery = ({ params, request }: HttpContextContract) => {
    let base = Product.query();
    if (params.category){
      if (params.category === "cosmetic"){
        params.category = 'SKINCARE'
      }
      base = base.where('category', 'like' ,params.category)
    }
    if (request.input('query')){
      return base.where('name', 'like', `%${request.input('query')}%`)
    }
    return base;
  }

  private makeProps = async (props: HttpContextContract) => {
    const highlightProduct = await this.getHighlightProduct(props);
    let isPaginator = props.route?.name !== "home";
    const base = {
      highlightProduct,
      products: await this.getProductQuery(props),
      category: props.params.category,
      mode: this.getMode(props),
    }
    if (! isPaginator){
      return base
    }
    const paginator = await this.makeQuery(props).paginate(props.params.page ?? 1)
    return {
      ...base,
      paginator
    }
  }
  public main = async (props : HttpContextContract) => {
    const { inertia } = props;
    return inertia.render('main', await this.makeProps(props))
  }
}
export default MainController
