import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminController {
  index = ({ inertia }: HttpContextContract) => {
    return inertia.render('admin.dashboard', {})
  }
}
