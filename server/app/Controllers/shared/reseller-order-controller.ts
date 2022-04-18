import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import {ResellerOrderRepository} from "App/repository/reseller-order-repository";
import Product from "App/Models/Product";
import {ResellerProductRepository, UpdateStockConfig} from "App/repository/reseller-product-repository";
import {ResellerOrderStatus} from "App/Enums/reseller-order-status";

export default class ResellerOrderController {

  private getIndexView = async ({auth} : HttpContextContract) => {
    const user = await auth.user as User;
    return user.role === "ADMINISTRATOR" ?
      "admin.reseller.orders"
      :
      "reseller.product.order"
  }
  public index = async (props: HttpContextContract) => {
    const user = props.auth.user as User;
    const repository = new ResellerOrderRepository(
      props.params, user.role === "ADMINISTRATOR" ? undefined: user.id
    )
    return props.inertia.render(
      await this.getIndexView(props), {
        paginator: await repository.preload().paginate()
      }
    )
  }
  public show = async (props: HttpContextContract) => {
    const repository = new ResellerOrderRepository(
      props.params
    )
    const entity = await repository.find()
    return {
      entity,
      payload: await repository.loadProductData(entity)
    }
  }
  public store = async ( props: HttpContextContract ) => {
    const repository = new ResellerOrderRepository(props.params);
    await repository.create(props)
    return props.response.redirect().toPath("/reseller/product/order")
  }
  public create = async ( props: HttpContextContract ) => {
    return props.inertia.render('reseller.product.add', {
      products : await Product.all()
    })
  }
  public update = async ( props: HttpContextContract ) => {
    const repository = new ResellerOrderRepository(props.params);
    const entity = await repository.updateStatus(
      await repository.find(), props.request
    )
    const orderRepository = new ResellerProductRepository({}, entity.resellerId);
    if (entity.status === ResellerOrderStatus.FINISH){
      const orderLists = await entity.productData()
      const promises = orderLists.map((item)=>{
        const payload : UpdateStockConfig = {
          productId: item.id,
          total: item.pax * item.amount
        }
        return orderRepository.updateStock(payload)
      })
      await Promise.all(promises);
    }
    return props.inertia.redirectBack();
  }
}
