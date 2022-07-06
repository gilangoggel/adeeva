import Database from "@ioc:Adonis/Lucid/Database";

export async function topProductQuery(){
  const q = await Database
    .from('transaction_items')
    .join('products', 'products.id','transaction_items.product_id')
    .select([
      'products.id',
      'products.name',
  ]).groupBy('product_id');
  return Promise.all(q.map( async item=>{
    const count = await Database.from('transaction_items').where(
      'product_id', item.id
    ).sum('amount', 'total')
    return {
      ...item,
      count : count[0].total
    }
  }))
}
