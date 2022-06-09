import Route from '@ioc:Adonis/Core/Route'
import { adminRoute } from './admin-route'
import { userRoutes } from './user-routes'
import { resellerRoute } from './reseller-route'

Route.get('/', 'main-controller.main').as("home")
Route.get('/category/:category', 'main-controller.main').as('category_page')
Route.get('/search', 'search-controller.index').as('search_page')
Route.get('/product/:name', 'main-controller.product')
Route.post('/product/:id/comment', 'main-controller.addComment')

Route.group(()=>{
  Route.group(()=>{
    Route.get("", 'main-controller.checkout')
  }).middleware("role:USER")
  Route.post("", 'user/checkout-controller.checkout')
  Route.post("reseller-list", 'user/checkout-helper-controller.resellerList')
  Route.post("shipment-cost", 'user/shipment-controller.cost')
  Route.get("payment-simulator", 'user/payment-simulator.index')
}).prefix("checkout")
Route.group(userRoutes).middleware("role:USER");

// Route.post("checko", 'user/transaction-controller.checkoutMeta')

Route.group(()=>{
  Route.get("account", 'user/account-controller.account')
  Route.post("account/change/:type", 'user/account-controller.update')
  Route.post("account/profile", 'account-controller.profile');
  Route.post("account/credential", 'account-controller.credential');
  Route.post("transaction/retur/:id", 'shared/retur-controller.store');
  Route.post("transaction/retur/:id/send", 'shared/retur-controller.send');
}).middleware("auth")

Route.get('/sign-in', 'auth-controller.showLogin')
Route.get('/sign-up', 'auth-controller.signup')
Route.post('/sign-up', 'auth-controller.register')
Route.post('/sign-in', 'auth-controller.login')
Route.post('/logout', 'auth-controller.logout')

Route.group(adminRoute)
  .middleware('role:ADMINISTRATOR')
  .prefix('admin')
Route.group(resellerRoute)
  .middleware('role:RESELLER')
  .prefix('reseller')
Route.get('/auth', ({auth})=>{
  return auth.user
}).middleware('auth')
