export type Item = {
  amount: number
} & IProduct

export type FormData = {
  products: Item[]
}
