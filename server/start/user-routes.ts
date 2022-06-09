import Route from "@ioc:Adonis/Core/Route";

export function userRoutes(){
  Route.get("transaction/:id", 'user/transaction-controller.status');
  Route.get("transaction", 'user/transaction-controller.all');
}
