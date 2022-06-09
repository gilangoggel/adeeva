import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Product";
import {LucidModel, ModelQueryBuilderContract} from "@ioc:Adonis/Lucid/Orm";

export default class SearchController{
  private query: ModelQueryBuilderContract<typeof Product, InstanceType<LucidModel>>;

  constructor() {
    this.query = Product.query()
  }

  byKeyword = ({request}: HttpContextContract) => {
    const keyword = request.input('keyword', '');
    if (keyword){
      this.query = this.query.where('name', 'like', `%${keyword}%`)
    }
    return this;
  }

  byCategory = ({request}: HttpContextContract) => {
    const category = request.input("category", "") as string;
    if (category){
      this.query = this.query.where('category', 'like', `%${category}%`)
    }
    return this;
  }

  applyOrder = ({request}: HttpContextContract) => {
    let order = request.input('order', 'name');
    let direction = "ASC";
    if (order !== "name"){
      if (order == "lowest_price"){
        direction = "DESC"
        console.log("should desc")
      }else{
        direction = "ASC"
      }
      order = "price"
    }
    console.log(direction)
    this.query = this.query.orderBy(order, direction as any)
    return this;
  }

  makeQuery = (props : HttpContextContract) => {
    const { request } = props;
    const page = request.input("page", 1);
    const baseQuery = this
      .byKeyword(props)
      .byCategory(props)
      .applyOrder(props)
      .query
    return baseQuery.paginate(page, 6);
  }

  public index = (props: HttpContextContract) => {
    const { inertia } = props
    return inertia.render("search", {
      paginator: this.makeQuery(props)
    });
  }

}
