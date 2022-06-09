import Route from "@ioc:Adonis/Core/Route";

export function adminRoute(){
  Route.get('/dashboard', 'admin/admin-controller.index')
  Route.get('/', 'admin/admin-controller.index')
  Route.resource('product', 'admin/product-controller')
  Route.resource('reseller', 'admin/reseller-controller')
  Route.resource('reseller-order', 'shared/reseller-order-controller').only([
    "update", "index", "show"
  ])
  Route.resource('user', 'admin/user-controller')
  const transactionsKeys = [
    'transaction',
    'shipment',
    'order',
    'retur'
  ];
  transactionsKeys.forEach(key=>{
    Route.get(key, `admin/${key}-controller.index`);
  })
  Route.post("transaction/update-shipment/:transaction", 'admin/transaction-controller.updateShipment')
  Route.get("transaction/:id/status", 'user/transaction-controller.status')
  Route.post("transaction/:id/tracking", 'admin/shipment-controller.pushTracking')
  Route.post("transaction/:id/completion", 'admin/transaction-controller.completeTransaction')
  Route.post("transaction/retur/:id/accept", 'shared/retur-controller.accept')
  Route.post("transaction/retur/:id/resend", 'shared/retur-controller.resend')

}
