import { types, Instance } from "mobx-state-tree";
import { authStoreType } from "./auth";
export type { IUser } from "./auth";

const APP_MODE = ["NORMAL", "BACKOFFICE"];

export type IAuth = Instance<typeof authStoreType["Type"]>;
export type IGlobalStore = Instance<typeof globalStoreType["Type"]>;

const globalStoreType = types
  .model({
    mode: types.enumeration(APP_MODE),
    auth: authStoreType,
  })
  .actions((self) => ({
    updateMode(mode: typeof APP_MODE[number]) {
      self.mode = mode;
    },
  }));

export const globalStore = globalStoreType.create({
  auth: {
    user: null,
  },
  mode: "NORMAL",
});
