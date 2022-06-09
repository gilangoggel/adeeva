import {Inertia} from "@inertiajs/inertia";

type Callback = (data?:Record<string, any>) => void

const keys = [
  'toSignIn' , 'toSignUp' , 'toCheckout' , 'toHome' , 'toAccount', 'toWishlist' , 'toSearch',
  'toAdminDashboard','toResellerDashboard'
] as const

type INavigation =  Record<typeof keys[number], Callback>

export class Navigation implements INavigation {

  toSignIn = () => Inertia.get("/sign-in")

  toHome = () => Inertia.get("/")

  toSignUp = () => Inertia.get("/sign-up")

  toCheckout = () => Inertia.get("/checkout")

  toAccount = () => Inertia.get("/account")

  toWishlist = () => Inertia.get("/wishlist")

  toAdminDashboard = () => Inertia.get("/admin/dashboard")

  toResellerDashboard = () => Inertia.get("/reseller/dashboard")

  toSearch = (params?: Record<string, any>) => {
    return Inertia.get("/search", params, {preserveState: true})
  };
  static to = (key : keyof INavigation, params?: Record<string, any>) => {
    const self = new Navigation()
    return self[key](params)
  }
  static toCallback = (key : keyof INavigation, cb?: ()=>void, params?: Record<string, any>) => {
    return ()=> {
      Navigation.to(key, params);
      if (cb){
        cb()
      }
    }
  }
}
