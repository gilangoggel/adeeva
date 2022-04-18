interface Entity {
  id: number
  createdAt: string
  updatedAt?: string
}

interface IProduct extends Entity{
  name: string
  price: number
  reseller_price: number
  category: string
  description: string
  image: string
  pax: number
}
interface IResellerOrder extends Entity{
  resellerId: string
  expedition: string
  deliveryReciptNumber: string
  productCount: number
  productQuantity: number
  total: number
  status: string
}
interface IResellerProduct extends Entity{
  resellerId: number
  productId: number
  stock:number
  product: IProduct
}

interface IReseller extends Entity{
  name: string
  user_id: number
  address: string
  city_id: number
  city: string
  bank: string
  bank_account: string
  balance: number
}
