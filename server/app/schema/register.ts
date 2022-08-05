import {schema, rules} from "@ioc:Adonis/Core/Validator";

export const registerSchema = schema.create({
  email: schema.string([rules.email(), rules.unique({
    table:"users", column:"email"
  })]),
  password: schema.string([rules.minLength(8), rules.confirmed("passwordConfirmation")]),
  name: schema.string(),
  cityId: schema.string(),
  address: schema.string(),
  postalCode: schema.string([rules.regex(/^\d+$/)])
})
