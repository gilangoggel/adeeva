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
