import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductController {
  public index = ({ request }: HttpContextContract) => {
    let q = Product.query()
    if (request.input('search')) {
      q = q.where('name', 'like', `%${request.input('search')}%`)
    }
    if (request.input('category')) {
      q = q.where('category', request.input('category'))
    }
    q = q.whereNull('deleted_at')
    return q.orderBy('created_at', 'desc').paginate(request.input('page', 1), 10)
  }

  public show = async ({ params }: HttpContextContract) => {
    const product = await Product.find(params.id)
    if (!product) {
      return {
        product: null,
        recomendation: [],
      }
    }
    const recomendation = await Product.query()
      .limit(10)
      .whereNot('id', '=', product.id)
      .where('category', '=', product.category)
    return {
      product,
      recomendation,
    }
  }
}
