import {usePage} from "@inertiajs/inertia-react";
import {useGlobalStore} from "@root/provider/globar-store-provider";

type User = {
  name: string
  id: number
  role: string
  email: string
}

export function useUser() : User {
  return useGlobalStore().user as User
}
