/**
 * File controller untuk otentikasi
 * - login
 * - meminta pengguna saat ini
 * - logout
 */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  private isRequestAuthenticated = (auth: HttpContextContract['auth']) => {
    return auth
      .authenticate()
      .then(() => true)
      .catch(() => false)
  }

  private attempt = ({ auth, request }: HttpContextContract) => {
    const email = request.input('email')
    const password = request.input('password')
    return auth
      .use('api')
      .attempt(email, password)
      .then((token) => {
        return {
          token,
        }
      })
      .catch(() => {
        return {
          token: null,
        }
      })
  }

  public login = async (ctx: HttpContextContract) => {
    const isAuth = await this.isRequestAuthenticated(ctx.auth)
    if (isAuth) {
      return {
        token: null,
      }
    }
    return this.attempt(ctx)
  }

  public logout = () => {
    return {
      logout: 'logout api',
    }
  }
  public user = ({ auth }: HttpContextContract) => {
    return auth
      .authenticate()
      .then((user) => {
        return {
          user,
        }
      })
      .catch(() => ({
        user: null,
      }))
  }
}
