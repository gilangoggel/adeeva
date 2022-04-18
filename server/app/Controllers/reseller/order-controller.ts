import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrderController {
  index = ({ inertia }: HttpContextContract) => {
    return inertia.render('reseller.order.list')
  }
  show = ({ inertia }: HttpContextContract) => {
    return inertia.render('reseller.order.show')
  }
}
