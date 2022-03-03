import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'

export type Options = {
  key: string
  dir: string
  model: any
}

export async function setFileToAttribute(
  { request }: HttpContextContract,
  { key, model, dir }: Options
) {
  const file = request.file(key)
  if (!file) return
  if (model[key]) {
    await Drive.delete(`${model[key]}`)
  }
  const filename = `${model.id}.${file.extname}`
  const fullpath = `${dir}/${filename}`
  await file.move(Drive.application.tmpPath('uploads'), {
    name: fullpath,
  })
  model[key] = await Drive.getUrl(fullpath)
  await model.save()
  await model.refresh()
  return model
}
