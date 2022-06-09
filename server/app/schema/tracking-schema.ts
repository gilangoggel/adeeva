import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import {schema} from "@ioc:Adonis/Core/Validator";

const base = ({
  text : schema.string()
});

export function checkoutSchema({request}: HttpContextContract){
  return request.validate({
    schema: schema.create(base)
  })
}
