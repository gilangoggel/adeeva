import {useGlobalStore} from "@root/provider/globar-store-provider";
import { IUserModel } from '@models/user-model.type'

export function useAuth(){
  const store = useGlobalStore()
  return store.user as IUserModel;
}
