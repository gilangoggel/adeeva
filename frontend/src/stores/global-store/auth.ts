import { types, Instance } from "mobx-state-tree";
import { tokenStorage } from "../../utilities/storage-instances";

const userType = types.model({
  name: types.string,
  id: types.identifierNumber,
  email: types.string,
  role: types.enumeration(["ADMINISTRATOR", "RESELLER", "USER"]),
});

export type IUser = Instance<typeof userType["Type"]>;

export const authStoreType = types
  .model({
    user: types.maybeNull(userType),
  })
  .actions((self) => ({
    setUser(user: IUser) {
      self.user = user;
    },
    removeUser() {
      self.user = null;
      tokenStorage.remove();
    },
  }));
