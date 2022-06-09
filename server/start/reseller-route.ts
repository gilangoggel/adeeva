import Route from "@ioc:Adonis/Core/Route";

const types = [
  'order',
  'shipment',
  'completed',
  'retur'
] as const;

const resolveTransactionController = (name :typeof types[number], method : string = '' ) => {
  const controller = 'transactions';
  const base = `reseller/${controller}/${name}-controller`;
  return method ? `${base}.${method}` : base;
}

export function resellerRoute(){
  Route.get('/dashboard', 'reseller/reseller-dashboard-controller.index')
  Route.get('/', 'reseller/reseller-dashboard-controller.index')
  Route.get('/product', 'reseller/product-controller.index')
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
  Route.group(()=>{

    types.forEach(k=>{
      Route.resource(`/transaction/${k}`, resolveTransactionController(k))
        .only(['index', 'store', 'update', 'destroy'])
    })
  })
  Route.post('/transaction/:id/completed',resolveTransactionController('completed', 'store'))
}
