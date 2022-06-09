import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import {schema, rules} from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";

function make({ request }: HttpContextContract, schema: any, messages: Record<string, any> = {}){
  return request.validate({
    schema: schema as any, messages
  })
}
function password(props: HttpContextContract){
  return make(props, schema.create({
    password: schema.string({}, [rules.confirmed('passwordConfirmation')])
  }))
}


function profile(props : HttpContextContract){
  return make(props, schema.create({
    name: schema.string(),
    picture: schema.file.optional({}, [])
  }))
}
function email(props: HttpContextContract){
  return make(props, schema.create({
    email: schema.string({}, [rules.email(), rules.unique({
      whereNot:{
        email: props.auth.user?.email as any
      },
      table: "users",
      column:"email"
    })])
  }), {
    'email.unique':"Alamat email sudah digunakan"
  })
}

export function credentialSchema(user: User){
  return schema.create({
    password: schema.string([rules.confirmed()]),
    email: schema.string({}, [rules.email(), rules.unique({
      whereNot:{
        email: user.email as any
      },
      table: "users",
      column:"email"
    })])
  })
}

function bank(props : HttpContextContract){
  return make(props, schema.create({
    bank: schema.string(),
    bankAccount: schema.string(),
    bankHolder: schema.string()
  }))
}
export const schames = {
  profile: schema.create({
    cityId: schema.string(),
    postalCode: schema.string(),
    address: schema.string(),
    phoneNumber: schema.string(),
    name: schema.string(),
    picture: schema.file.optional({}, [])
  })
}

function contact(props : HttpContextContract){
  return make(props, schames.profile)
}

export const validators = {
  contact,
  bank,
  profile,
  email,
  password
}
