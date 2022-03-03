import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from '../../Models/Product'
import { saveSchema, updateSchema } from 'App/schema/product'
import { ApiResponse } from 'App/Helper/api-response'
import { Crud } from 'App/Utiities/Crud'
import * as fileHelper from '../../Helper/file-helpers'

export default class ProductController {
  private resolveFileHelperOption = (product: Product): fileHelper.Options => ({
    key: 'image',
    dir: 'product',
    model: product,
  })

  private afterSave = (context: HttpContextContract) => {
    return async (product: Product) => {
      await fileHelper.setFileToAttribute(context, this.resolveFileHelperOption(product))
    }
  }

  public dev = async ({ view }: HttpContextContract) => {
    return view.render('product', {
      products: await Product.all(),
    })
  }
  /**
   * Method untuk menambahkan produk
   */
  public store = (context: HttpContextContract) => {
    const apiResponse = new ApiResponse()
    const crud = new Crud<Product>()
    const { request } = context
    /**
     * Melakukan validasi input
     */
    const validateInput = request.validate({
      schema: saveSchema,
    })
    const save = crud.store(context, {
      modelClass: Product,
      excepts: ['image', 'method'],
      afterSave: this.afterSave(context),
    })
    return validateInput.then(save).catch(apiResponse.errorInput(context))
  }
  /**
   * Method untuk mengedit produk
   */
  public update = async (context: HttpContextContract) => {
    const crud = new Crud<Product>()
    const update = crud.update(context, {
      modelClass: Product,
      excepts: ['image', 'method'],
      afterSave: this.afterSave(context),
    })
    const api = new ApiResponse()
    return context.request
      .validate({
        schema: updateSchema,
      })
      .then(update)
      .catch(api.errorInput(context))
  }
  /**
   * Method untuk menghapus produk
   */
  public destroy = (context: HttpContextContract) => {
    return new Crud().softDeletes(context, Product)()
  }
}
