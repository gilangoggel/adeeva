import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transaction'
import { PaymentStatus } from 'App/Enums/payment-status'

/**
 * @todo
 * reseller and transaction check
 */
export default class ResellerTransactionController {
  public update = async ({ params: { id }, response }: HttpContextContract) => {
    const transaction = (await Transaction.find(id)) as Transaction
    if (!transaction) {
      return response.abort({})
    }
    transaction.status = PaymentStatus.SENDING
    await transaction.save()
    return transaction
  }
}
