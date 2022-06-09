import type {ComponentType} from "react";
import { Main } from '../pages/main'
import { SignIn } from '../pages/sign-in'
import { SignUp } from '../pages/sign-up'
import { DefaultPage } from '../pages/default-page'
import { Product as product } from '../pages/product'
import { Checkout as checkout } from '../pages/checkout'
import { Account as account } from '../pages/account'
import { Search as search } from '../pages/search'
/**
 * Admin pages
 */
import { Dashboard as AdminDashboard } from '../pages/admin/dashboard'
import { Dashboard as ResellerDashboard } from '../pages/reseller/dashboard'
import { List as AdminProductList } from '../pages/admin/product/list'
import { Create as AdminProductCreate } from '../pages/admin/product/create'
import { List as AdminResellerList } from '../pages/admin/reseller/list'
import { Create as AdminResellerCreate } from '../pages/admin/reseller/create'
import { Edit as AdminEditProduct } from '../pages/admin/product/edit'
import { Show as AdminShowProduct } from '../pages/admin/product/show'
import { List as AdminListUser } from '../pages/admin/user/list'
import { ResellerOrder as AdminResellerOrder } from '../pages/admin/reseller/order'
import { AdminOrder } from '../pages/admin/order'
import { AdminTransaction } from '../pages/admin/transaction'
import { AdminRetur } from '../pages/admin/retur'
import { AdminShipment } from '../pages/admin/shipment'

/**
 * Reseller
 */
import { List as ResellerProductList } from '../pages/reseller/product/list'
import { Add as ResellerAddProduct } from '../pages/reseller/product/add'
import { Order as ResellerOrderProduct } from '../pages/reseller/product/order'
import { List as ResellerOrderList } from '../pages/reseller/order/list'
import { Show as ResellerOrderShow } from '../pages/reseller/order/show'
import { ResellerTransaction } from '../pages/reseller/transaction'



import { get } from 'lodash'
import {wrapLayoutComponent} from "@utils/wrap-layout-component";

const pages= {
  main: Main,
  checkout,
  account,
  product,
  search,
  'sign-in': SignIn,
  'sign-up': SignUp,
  reseller:{
    dashboard: ResellerDashboard,
    product:{
      list: ResellerProductList,
      add: ResellerAddProduct,
      order: ResellerOrderProduct
    },
    order:{
      show: ResellerOrderShow,
      list: ResellerOrderList
    },
    transaction:ResellerTransaction
  },
  admin:{
    dashboard: AdminDashboard,
    transaction:{
      list: AdminTransaction
    },
    shipment:{
      list: AdminShipment
    },
    retur:{
      list: AdminRetur
    },
    order:{
      list: AdminOrder
    },
    product:{
      list : AdminProductList,
      create : AdminProductCreate,
      edit:AdminEditProduct,
      show: AdminShowProduct
    },
    reseller:{
      list: AdminResellerList,
      create: AdminResellerCreate,
      orders: AdminResellerOrder,
    },
    user:{
      list: AdminListUser
    }
  },
}

export const loadPage = async ( name: string ) : Promise<ComponentType> => {
  const page = get(pages, name) as ComponentType<any> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (! page){
    return DefaultPage;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (! page.layout){
    return wrapLayoutComponent(page)
  }
  return page
}
