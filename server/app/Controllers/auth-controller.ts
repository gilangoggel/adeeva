import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

const loginSchema = schema.create({
  email: schema.string({}, [
    rules.email(),
    rules.exists({
      table: 'users',
      column: 'email',
    }),
  ]),
  password: schema.string(),
})
class AuthController {
  public showLogin = async ({ inertia, auth, response, session }: HttpContextContract) => {
    if (!(await this.isUnAuthenticated(auth))) {
      return response.redirect().toPath('/')
    }
    const authError = session.get('authError') ?? null
    session.forget('authError')
    return inertia.render('sign-in', {
      authError,
    })
  }
  private isUnAuthenticated = (auth: any) =>
    auth
      .authenticate()
      .then((user) => !user)
      .catch(() => true)

  public login = async ({ request, auth, response, session }: HttpContextContract) => {
    const { email, password } = await request.validate({
      schema: loginSchema,
      messages: {
        required: '{{field}} wajib di isi',
        exists: 'Alamat email belum terdaftar',
      },
    })
    const guard = auth.use('web')
    if (!(await this.isUnAuthenticated(auth))) {
      return response.redirect().toPath('/')
    }
    return guard
      .attempt(email, password)
      .then(() => response.redirect().toPath('/'))
      .catch(async () => {
        await session.put('authError', true)
        return response.redirect().toPath('/sign-in')
      })
  }

  public logout = async ({ auth, response }: HttpContextContract) => {
    await auth.logout()
    return response.redirect().toPath('/')
  }
}

export default AuthController
