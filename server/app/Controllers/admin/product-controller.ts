// noinspection JSUnusedGlobalSymbols

import { BackofficeController } from '../interfaces/backoffice-controller'
import Product from 'App/Models/Product'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import { makeSaveAction, makeDestroyAction } from 'App/Utiities/crud-functions'
import { productSchema, messages } from 'App/schema/product'

export default class ProductController extends BackofficeController<Product> {
  resolveModel(): Product {
    return new Product()
  }
  getSchema = productSchema
  protected getMessages = messages

  save = makeSaveAction<Product>({
    fileConfigs: [
      {
        key: 'image',
        dir: 'product',
      },
    ],
  })

  onDestroy = makeDestroyAction<typeof Product>({
    model: Product,
    isSoftDelete: true,
  })

  getBase(): string {
    return 'admin'
  }

  getEntity(): string {
    return 'product'
  }

  getBuilder({
    sort = 'created_at',
    direction = 'desc',
    search = '',
  }: Record<string, any>): ModelQueryBuilderContract<any> {
    const base = Product.query().whereNull('deleted_at').orderBy(sort, direction)
    if (search) {
      base.where('name', 'like', `%${search}%`)
    }
    return base
  }
}
