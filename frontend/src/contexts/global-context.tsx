import * as React from "react";
import { globalStore, IGlobalStore } from "../stores/global-store";

const GlobalStoreContext = React.createContext<null | IGlobalStore>(null);
export function useGlobal(): IGlobalStore {
  return React.useContext(GlobalStoreContext) as IGlobalStore;
}
export const GlobalContext = ({ children }: any) => {
  return (
    <GlobalStoreContext.Provider value={globalStore}>
      {children}
    </GlobalStoreContext.Provider>
  );
};
