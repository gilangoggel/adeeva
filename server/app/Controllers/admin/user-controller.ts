// noinspection JSUnusedGlobalSymbols

import { BackofficeController } from '../interfaces/backoffice-controller'
import User from 'App/Models/User'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import { makeSaveAction, makeDestroyAction } from 'App/Utiities/crud-functions'
import { resellerSchema, messages } from 'App/schema/reseller'

export default class UserController extends BackofficeController<User> {
  resolveModel(): User {
    return new User()
  }
  getSchema = resellerSchema
  protected getMessages = messages

  save = makeSaveAction<User>({})

  onDestroy = makeDestroyAction<typeof User>({
    model: User,
    isSoftDelete: true,
  })
  getBase(): string {
    return 'admin'
  }
  getEntity(): string {
    return 'user'
  }
  getBuilder({
    sort = 'created_at',
    direction = 'desc',
    search = '',
  }: Record<string, any>): ModelQueryBuilderContract<any> {
    let base = User.query().orderBy(sort, direction).where('role', 'USER')
    if (search) {
      base.where('name', 'like', `%${search}%`)
    }
    return base
  }
}
