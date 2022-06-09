import { types } from 'mobx-state-tree'


export const notificationModel = types.model({
  id: types.identifierNumber,
  text: types.optional(types.string, ""),
  readed: types.optional(types.boolean, false),
  created_at: types.optional(types.string, ""),
  action_link: types.optional(types.string, "")
}).actions(self=>({
  markAsReaded(){
    self.readed = true
  }
}))
