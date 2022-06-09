import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { LucidModel } from '@ioc:Adonis/Lucid/Orm'
import * as FileHelper from '../Helper/file-helpers'
import { DateTime } from 'luxon'

type Payload = Record<string, any>
type Entity = InstanceType<LucidModel>

export type SaveActionArgs<T extends Entity> = {
  payload: Payload
  entity: T
  context: HttpContextContract
}
type SaveActionConfig = {
  fileConfigs?: Omit<FileHelper.Options, 'model'>[]
}
export type SaveAction<T extends Entity> = (args: SaveActionArgs<T>) => Promise<T>
export type DestroyAction<T extends Entity> = (identifier: any) => Promise<T>

export function makeSaveAction<T extends Entity>({
  fileConfigs = [],
}: SaveActionConfig): SaveAction<T> {
  return async ({ entity, payload, context }) => {
    await entity.merge(payload as any)
    for (const index in fileConfigs) {
      const { file } = context.request
      const config = fileConfigs[index]
      if (file(config.key)) {
        await FileHelper.setFileToAttribute(context, {
          ...config,
          model: entity,
        })
      }
    }
    return entity
  }
}
type DestroyActionConfig<T extends LucidModel> = {
  model: T
  isSoftDelete?: boolean
}
export function makeDestroyAction<T extends LucidModel>({
  isSoftDelete = true,
  model: Model,
}: DestroyActionConfig<T>): DestroyAction<InstanceType<T>> {
  return async (identifier: any) => {
    const entity = (await Model.find(identifier)) as InstanceType<T>
    if (isSoftDelete) {
      // @ts-ignore
      entity.deletedAt = DateTime.local()
      await entity.save()
    } else {
      // @ts-ignore
      await entity.delete()
      return entity as InstanceType<T>
    }
    return entity as InstanceType<T>
  }
}
