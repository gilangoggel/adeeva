import { transactionModel } from '@models/transaction-extended'
import { listDrawerStore } from '@stores/utility'

export enum TabTypes{
  DETAIL = 'detail',
  ITEMS = 'items',
  RESELLER = 'reseller'
}
const modes = [TabTypes.DETAIL, TabTypes.ITEMS, TabTypes.RESELLER]

const storeModel = listDrawerStore<typeof transactionModel>(transactionModel, modes);

export const store = storeModel.create({})
