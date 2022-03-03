import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

type ErrorConfig = {
  context: HttpContextContract
  reason: string
  body: Record<string, any>
  message?: string
}

export class ApiResponse {
  public error = ({ context: { response }, reason, body, message = '' }: ErrorConfig) => {
    return response.badRequest({
      type: reason,
      errors: body,
      message,
    })
  }
  public errorInput = (context: HttpContextContract) => {
    return (reason: any) => {
      if (reason.messages) {
        return this.error({
          context,
          body: reason.messages,
          reason: 'invalid-input',
          message: 'input invalid',
        })
      }
      console.log(reason)
      return this.error({
        context,
        body: {},
        reason: 'other',
        message: 'see console',
      })
    }
  }

  public errorModelNotFound = (context: HttpContextContract) => {
    return () =>
      this.error({
        context,
        body: {},
        reason: context.params['id'] ? 'model-not-found' : 'invalid-param',
        message: context.params['id'] ? 'model id is not found' : 'parameter invalid',
      })
  }

  public store = (model: Record<string, any>) => {
    return {
      payload: model,
    }
  }
}
