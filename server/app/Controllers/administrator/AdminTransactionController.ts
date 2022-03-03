import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PaymentStatus } from 'App/Enums/payment-status'
import Transaction from 'App/Models/Transaction'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class AdminTransactionController {
  public update = async ({ request, params }: HttpContextContract) => {
    const transaction = (await Transaction.find(params.id)) as Transaction
    const status = request.input('status')
    if (status === PaymentStatus.SENDING) {
      await request.validate({
        schema: schema.create({
          trackingNumber: schema.string(),
        }),
      })
      transaction.trackingNumber = request.input('trackingNumber')
    }
    transaction.status = status
    await transaction.save()
    return transaction
  }
}
