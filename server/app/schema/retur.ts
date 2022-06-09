import {rules, schema} from "@ioc:Adonis/Core/Validator";

export const returSchema = schema.create({
  photo: schema.file(),
  reason: schema.string()
})
export const sendReturSchema = schema.create({
  expedition: schema.string(),
  trackingNumber: schema.string([
    rules.minLength(11),
  ])
});
