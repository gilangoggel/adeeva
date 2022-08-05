import * as fake from 'minifaker';
import voca from 'voca'

export default class GenerateFakeTransactionMeta{

  private transactionId: number;
  private grossAmount: number;


  constructor({transaction: {id, total, shippingCost} } : Record<string, any>) {
    this.transactionId = id;
    this.grossAmount = total + shippingCost;
  }

  generate = () => {
    return {
      transactionId: this.transactionId,
      grossAmount: this.grossAmount,
      merchant_id: 'G553123140',
      payment_type: "bank_transfer",
      va_numbers: [{"bank":fake.arrayElement(["bca", 'bri']) ,
        "va_number": voca(fake.creditCardNumber()).replaceAll("-", "")}],
      actions: [],
      id: fake.uuid.v4(),
      status: "settlement"
    }
  }
}
