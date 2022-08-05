import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { registerSchema } from 'App/schema/register'
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";
import Profile from "App/Models/Profile";

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
  public showLogin = async ({ inertia, auth, request, session, response }: HttpContextContract) => {
    return auth.use('web').authenticate().then( async (user)=>{
      if (user){
        await auth.use('web').login(user)
      }
      return user ? response.redirect().toPath("/") : response.redirect().toPath("/sign-in");
    }).catch(()=>{
      const authError = session.get('authError') ?? null
      session.forget('authError')
      return inertia.render('sign-in', {
        authError,
        registered : request.input("register" , '')
      })
    })
  }
  public login = async ({ request, auth, response, session }: HttpContextContract) => {
    const { email, password } = await request.validate({
      schema: loginSchema,
      messages: {
        required: '{{field}} wajib di isi',
        exists: 'Alamat email belum terdaftar',
      },
    })
    const guard = auth;
    return guard
      .attempt(email, password)
      .then( async (e) => {
        await auth.login(e)
        return response.redirect().toPath("/");
      })
      .catch(async () => {
        await session.put('authError', true)
        return response.redirect().toPath('/sign-in')
      })
  }
  public logout = async ({ auth }: HttpContextContract) => {
    await auth.authenticate();
    if (! auth.user){
      return {
        status: false
      }
    }
    await auth.logout()
    return {
      status: true
    }
  }
  public signup = ({inertia, auth, response}: HttpContextContract) => {
    if (auth.user){
      return response.redirect().toPath("/")
    }
    return inertia.render("sign-up")
  }
  public register = async ({ request, response }: HttpContextContract) =>{
    const validated = await request.validate({
      schema: registerSchema
    });
    const { password, name, email, cityId, postalCode, address } = validated;
    const user = await User.create({
      name,
      email,
      role: "USER",
      password: await Hash.make(password)
    });
    await Profile.create({
      userId: user.id,
      cityId: cityId as any,
      postalCode,
      address
    });
    return response.redirect().toPath(`/sign-in?register=${validated.email}`)
  }

  public notifications =async ({auth}: HttpContextContract) => {
    try {
      const user = await auth.authenticate();
      const unread = await user.unreadNotifications();
      const readed = await user.readNotifications();
      const {chain} = await import('lodash');
      const format = (item) => {
        return ({
          ...item.data,
          id: item.id,
          read: item.read,
          at: item.createdAt.toFormat('y-MM-d'),
        })
      }
      const stacks = [...unread, ...readed].map(format);
      return chain(stacks).keyBy('id').mapValues().value();
    }catch (e){
      return {};
    }
  }

}

export default AuthController
