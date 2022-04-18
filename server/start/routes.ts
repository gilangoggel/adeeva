import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'main-controller.main').as("home")
Route.get('/category/:category', 'main-controller.main').as('category_page')
Route.get('/search', 'main-controller.main').as('search_page')
Route.get('/product/:name', 'main-controller.product')



Route.get('/sign-in', 'auth-controller.showLogin')
Route.post('/sign-in', 'auth-controller.login')
Route.post('/logout', 'auth-controller.logout')

Route.group(() => {
  Route.get('/dashboard', 'admin/admin-controller.index')
  Route.get('/', 'admin/admin-controller.index')
  Route.resource('product', 'admin/product-controller')

  Route.resource('reseller', 'admin/reseller-controller')
  Route.resource('reseller-order', 'shared/reseller-order-controller').only([
    "update", "index", "show"
  ])
  Route.resource('user', 'admin/user-controller')
})
  .middleware('role:ADMINISTRATOR')
  .prefix('admin')
Route.group(() => {
  Route.get('/dashboard', 'reseller/reseller-dashboard-controller.index')
  Route.get('/', 'reseller/reseller-dashboard-controller.index')
  Route.get('/product', 'reseller/product-controller.index')
  // Route.get('/product/add', 'reseller/product-controller.add')
  // Route.get('/product/order', 'reseller/product-controller.order')
  // Route.get('/product/order/:id', 'reseller/product-controller.orderDetail')
  Route.get('/orders', 'reseller/order-controller.index')
  Route.get('/order/:orderId', 'reseller/order-controller.show')
  Route.group(()=>{
    const controller = 'shared/reseller-order-controller';
    Route.get('/add', `${controller}.create`);
    Route.get('/order', `${controller}.index`);
    Route.post('/order', `${controller}.store`);
    Route.get('/order/:id', `${controller}.show`)
    Route.put('/order/:id', `${controller}.update`)
  }).prefix("product")
})
  .middleware('role:RESELLER')
  .prefix('reseller')
