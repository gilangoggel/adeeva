export type ResellerInfo = {
  id: number
  name: string
  cityId: string
  city: string
  productsList: {
    id: number,
    product: IProduct
    stock: number
    product_id: number
  }[]
}
