import { types } from 'mobx-state-tree'
import moment from "moment";

export const notificationModel = types.model({
  id: types.identifierNumber,
  text: types.optional(types.string, ""),
  read: types.optional(types.boolean, false),
  at: types.optional(types.string, ""),
  action: types.optional(types.string, "")
}).actions(self=>({
  markAsReaded(){
    self.read = true
  },
})).views(self=>({
  get date(){
    moment.locale('id');
    return moment(self.at).fromNow()
  }
}))
