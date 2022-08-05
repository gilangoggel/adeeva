import {useAuth} from "@hooks/use-auth";
import {ComponentType} from "react";
import { Apps , AccountCircle, AccountBalance, ShoppingCart } from '@mui/icons-material'

type Link = {
  icon: ComponentType,
  to: string
  label : string
}

const user : Link[] = [
  {
    icon: AccountCircle, label: "Akun saya", to: '/account'
  },
  {
    icon: AccountBalance, label: "Transaksi", to: '/account?tab=transaction'
  },
  {
    icon: ShoppingCart, label: "Checkout", to: '/checkout'
  },
]

const backoffice = (user: any) : Link =>({
  icon: Apps, to: user.role === "ADMINISTRATOR" ? '/admin/dashboard' :'/reseller/dashboard', label: 'Backoffice'
})

export function useUserLinks() : Link []{
  const auth = useAuth();
  if (auth.role !== "USER"){
    return [backoffice(auth)]
  }
  return user;
}
