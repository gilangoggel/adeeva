import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ResellerDashboardController {
  index = ({ inertia }: HttpContextContract) => {
    return inertia.render('reseller.dashboard')
  }
}
