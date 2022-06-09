import {Instance, types} from 'mobx-state-tree'

export const chatDataModel = types.model({
  receiver_name: types.string,
  sender_name: types.string,
  message: types.string,
  from: types.number,
  to: types.number,
  id: types.identifierNumber,
  date: types.string,
  readed: types.optional(types.boolean,false),
})
export type IChatData = Instance<typeof chatDataModel['Type']>
