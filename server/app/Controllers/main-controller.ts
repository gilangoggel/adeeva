import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from "App/Models/Product";
import { sampleSize } from 'lodash'
import voca from 'voca';

class MainController {

  product = async ({inertia, params : {name}}: HttpContextContract) => {
    if (! name){
      return inertia.redirectBack();
    }
    const query = voca(name as string).replaceAll(`_`, ' ').value()
    const product = await Product.query().where('name', 'like', `${query}`).first();
    console.log(query)
    if (! product){
      return inertia.redirectBack();
    }
    const recomendations = await Product.query()
      .whereNot('id', product.id)
      .where('category', 'like', product.category)
      .limit(5)
    return inertia.render('product', {
      product,
      recomendations
    });
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
    if (preserve.length  === 5){
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
