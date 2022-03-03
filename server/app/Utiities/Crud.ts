import { LucidRow } from '@ioc:Adonis/Lucid/Orm'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ApiResponse } from 'App/Helper/api-response'
import { DateTime } from 'luxon'

interface H<T> {
  new (): T
}

type Config<T extends LucidRow> = {
  modelClass: H<T>
  excepts?: string[]
  afterSave?(model: T): void | Promise<void>
}

function findDirty(model: any, input: any) {
  const dirties: Record<string, any> = {}
  Object.keys(input).forEach((k) => {
    if (input[k] !== null && input[k] !== model[k]) {
      dirties[k] = input[k]
    }
  })
  return dirties
}

export class Crud<T extends LucidRow> {
  public store = (
    { request }: HttpContextContract,
    { modelClass: Classes, excepts = [], afterSave }: Config<T>
  ): (() => Promise<any>) => {
    return async () => {
      const model = new Classes()
      model.fill(request.except(excepts) as any)
      await model.save()
      afterSave && afterSave(model)
      const apiResponse = new ApiResponse()
      return apiResponse.store(model)
    }
  }

  public softDeletes = (context: HttpContextContract, modelClass: H<T>) => {
    return async () => {
      const api = new ApiResponse()
      const id = context.params['id']
      // @ts-ignore
      const model = (await modelClass.find(id)) as T
      if (!model) return api.errorModelNotFound(context)()
      // @ts-ignore
      model.deletedAt = DateTime.local()
      await model.save()
      return api.store(model)
    }
  }

  public update = (
    context: HttpContextContract,
    { afterSave, excepts = [], modelClass }: Config<T>
  ): (() => Promise<any>) => {
    return async () => {
      const { params, request } = context
      const api = new ApiResponse()
      if (!params['id']) {
        return api.errorModelNotFound(context)()
      }
      const id = params['id']
      // @ts-ignore
      const model = (await modelClass.find(id)) as T
      if (!model) {
        return api.errorModelNotFound(context)()
      }
      const toUpdates = findDirty(model, request.except(excepts))
      if (Object.keys(toUpdates).length) {
        Object.keys(toUpdates).forEach((k) => {
          model[k] = toUpdates[k]
        })
        await model.save()
      }
      afterSave && afterSave(model)
      return api.store(model)
    }
  }
}
