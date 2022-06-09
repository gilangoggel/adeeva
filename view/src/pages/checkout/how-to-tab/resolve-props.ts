import { ITransaction } from '@models/transaction-extended'


export function resolveVirtualAccount(transaction: ITransaction){
  const { meta } = transaction;
  const resolveBillKey = () : string => {
    if (meta.isMandiri || meta.bill_key){
      return meta.bill_key as string
    }
    return "";
  }
  return {
    gross_amount : meta.gross_amount,
    va_number : meta.va_numbers && meta.va_numbers[0] ? meta.va_numbers[0].va_number : "",
    bill_key: resolveBillKey()
  }
}
