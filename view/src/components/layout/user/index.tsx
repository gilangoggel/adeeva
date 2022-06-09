import { Header } from './header'
import { CartContext, userCartStore, applyStoreSnapshoot } from '@stores/cart-store'
import {observer} from "mobx-react";
import {useEffect} from "react";
import { Common } from '../common'

export const User = Common;

// export const User = observer(({children}: any)=>{
//   useEffect(applyStoreSnapshoot, [])
//   return (
//     <CartContext.Provider value={userCartStore}>
//       <Header/>
//       {children}
//     </CartContext.Provider>
//   )
// })
