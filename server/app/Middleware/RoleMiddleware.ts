import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoleMiddleware {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    roles: string[]
  ) {
    return auth
      .use('web')
      .authenticate()
      .then(() => {
        const user = auth.user
        if (user && user.role === roles[0]) {
          return next()
        }
        return response.redirect().back()
      }).catch((e)=> {
        if (! auth.user){
          return response.redirect().toPath("/sign-in");
        }
        return response.abort({
          error: true,
          traces: e
        })
      })
  }
}
