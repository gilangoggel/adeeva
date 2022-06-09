import { types } from 'mobx-state-tree'
import { chatDataModel } from './chat-data'

const messagesBankModel= types.model({
  messages : types.optional( types.map(chatDataModel), {})
}).actions(self=>({
  add(data: any){
    console.log('push to message bank', data)
  }
}));

export const messageBank = messagesBankModel.create({});
