import { types } from 'mobx-state-tree'

const wishlist = types.model({
  price: types.number,
  name: types.string,
})

const userWishlistModel = types.model({

})
