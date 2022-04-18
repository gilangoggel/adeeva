import type { Instance} from 'mobx-state-tree';
import {types as t} from 'mobx-state-tree'
import { userModelType } from '@models/user-model.type'
import { rootStoreReference } from '@utils/root-store-reference'

export enum AppMode{
  USER = 'user',
  RESELLER = 'reseller',
  ADMIN = 'admin'
}

const utils = rootStoreReference<typeof userModelType>(userModelType)
const actions = (self: any) => {
  const setUser = (user: any) => {
    utils.setter(self, user)
  }
  return {setUser}
}
const views = (self : any) => ({
    get user(){
      return utils.getter(self)
    },
    get appmode() : AppMode {
      const {user} = this;
      if (! user) return AppMode.USER
      if (user.role === "USER"){
        return AppMode.USER
      }
      return user.role === "ADMINISTRATOR" ? AppMode.ADMIN : AppMode.RESELLER;
    }
  })
export const globalStore = t.model({
  userId: t.maybeNull(t.number)
})
  .actions(actions)
  .views(views)

export type IGlobalStore = Instance<typeof globalStore['Type']>
