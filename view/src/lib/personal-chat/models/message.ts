import { types } from 'mobx-state-tree'

export const message = types.model({
  receiver_name: types.string,
  sender_name: types.string,
  message: types.string,
  from: types.number,
  to: types.number,
  id: types.identifierNumber,
  chat_id: types.number,
  date: types.string,
  readed: types.optional(types.boolean,false),
})
