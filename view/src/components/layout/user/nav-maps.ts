import {ComponentType} from "react";
import {AccountCircle, Favorite, ShoppingCart} from "@mui/icons-material";
import {Inertia} from "@inertiajs/inertia";


export type NavItem = {
  label: string
  link: string
  icon?: ComponentType<any>
}

export function navigate(item: NavItem){
  return ()=>Inertia.get(item.link, {}, {
    preserveState: true,
    preserveScroll: false
  })
}

export const ControlLinks : NavItem[] = [
  {
    label: "Wishlist",
    icon: Favorite,
    link: "/wishlist"
  },
  {
    label: "Keranjang belanja",
    icon: ShoppingCart,
    link: "/cart"
  },
  {
    label: "Login",
    icon: AccountCircle,
    link: "/sign-in"
  },
]

export const categoryLinks : NavItem[] = [
  {
    label: "Makanan",
    link: "/category/fnb"
  },
  {
    label: "Pakaian",
    link: "/category/clotes"
  },
  {
    label: "Produk kecantikan",
    link: "/category/cosmetic"
  },
];
