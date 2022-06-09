import type {Instance, SnapshotIn} from 'mobx-state-tree';
import { types as t} from 'mobx-state-tree'

export const userModelType = t.model({
  id: t.identifierNumber,
  name: t.string,
  email: t.string,
  role: t.enumeration([
    "ADMINISTRATOR", 'RESELLER', 'USER'
  ]),
  createdAt: t.string,
  updatedAt: t.maybeNull(t.string),
  picture: t.optional(t.string, "")
}).named('user').actions(self=>({
  update(values: Partial<SnapshotIn<typeof self>>){
    Object.assign(self, values);
  }
}))
export type IUserModel = Instance<typeof userModelType['Type']>
