import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('', 'AuthController.user')
    Route.post('', 'AuthController.login')
    Route.post('logout', 'AuthController.logout')
  }).prefix('auth')
  /**
   * ----- Route untuk admin ------
   */
  Route.group(() => {
    Route.group(() => {
      Route.get('dev', 'administrator/ProductController.dev')
      Route.post('', 'administrator/ProductController.store')
      Route.post(':id', 'administrator/ProductController.update')
      Route.delete(':id', 'administrator/ProductController.destroy')
    }).prefix('product')
    Route.post('transaction/:id', 'administrator/AdminTransactionController.update')
  }).prefix('administration')

  Route.group(() => {
    Route.post('transaction/:id', 'reseller/ResellerTransactionController.update')
  }).prefix('reseller')
  /**
   * Route untuk user
   */
  Route.post('transaction', 'TransactionsController.store')
  Route.post('avaibility', 'TransactionsController.checkProductAvaibility')
  Route.get('avaibility', 'TransactionsController.checkProductAvaibility')
  Route.get('product', 'ProductController.index')
  Route.get('product/:id', 'ProductController.show')
}).prefix('api/v1')
