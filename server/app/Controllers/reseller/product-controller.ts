import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import {ResellerRepository} from "App/repository/reseller-repository";
import {ResellerProductRepository} from "App/repository/reseller-product-repository";

export default class ProductController {
  index = async ({ inertia, auth, request }: HttpContextContract) => {
    const repository = new ResellerRepository(request.params())
    const reseller = await repository.findByUserId(auth)
    const productRepository = new ResellerProductRepository(
      request.params(), reseller.id
    )
    return inertia.render('reseller.product.list', await productRepository.paginate())
  }
}
