import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { LucidModel, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import { schema } from '@ioc:Adonis/Core/Validator'
import { DestroyAction, SaveAction } from 'App/Utiities/crud-functions'
export { SaveAction, DestroyAction } from 'App/Utiities/crud-functions'

export abstract class BackofficeController<T extends InstanceType<LucidModel>> {
  entity: string = ''
  base: string = ''

  abstract getEntity(): string
  abstract getBase(): string
  abstract getBuilder(queries: Record<string, any>): ModelQueryBuilderContract<any>
  abstract save: SaveAction<T>
  abstract resolveModel(): T
  abstract onDestroy: DestroyAction<T>

  protected getMessages(): any {
    return undefined
  }

  protected getSchema = (isUpdate: boolean = true) => {
    console.log(isUpdate)
    return schema.create({})
  }

  private resolveUiPath = (action: string) => {
    return `${this.getBase()}.${this.getEntity()}.${action}`
  }

  private resolveEntity = ({ params: { id } }: HttpContextContract) => {
    return this.getBuilder({})
      .where({
        id,
      })
      .first()
  }

  saveAction = async (context: HttpContextContract, entity: T, isUpdate = true) => {
    const payload = await context.request.validate({
      schema: this.getSchema(isUpdate),
      messages: this.getMessages(),
    })
    const listUri = context.request.url(false).replace(`/${context.params.id}`, '')
    await this.save({
      entity: entity as any,
      payload,
      context,
    })
    return context.response.redirect().toPath(listUri)
  }
  index = async ({ inertia, request }: HttpContextContract) => {
    const page = request.input('page', 1)
    const paginate = await this.getBuilder(request.all()).paginate(page, 10)
    return inertia.render(this.resolveUiPath('list'), {
      // @ts-ignore
      paginator: await paginate.serialize(),
      query: request.all(),
    })
  }
  edit = async (context: HttpContextContract) => {
    const entity = await this.resolveEntity(context)
    const { inertia } = context
    if (!entity) {
      return inertia.redirectBack()
    }
    return inertia.render(this.resolveUiPath('edit'), {
      entity,
    })
  }

  create = ({ inertia }: HttpContextContract) => {
    return inertia.render(this.resolveUiPath('create'))
  }

  show = async (context: HttpContextContract) => {
    const entity = await this.resolveEntity(context)
    const { inertia } = context
    if (!entity) {
      return inertia.redirectBack()
    }
    return inertia.render(this.resolveUiPath('show'), {
      entity,
    })
  }

  /**
   * put / patch
   * @param context
   */
  update = async (context: HttpContextContract) => {
    const entity = await this.resolveEntity(context)
    return this.saveAction(context, entity)
  }
  /**
   * post
   * @param context
   */
  store = async (context: HttpContextContract) => {
    return this.saveAction(context, this.resolveModel(), false)
  }
  /**
   * delete
   * @param context
   */
  destroy = async (context: HttpContextContract) => {
    await this.onDestroy(context.params.id)
    return context.inertia.redirectBack()
  }
}
