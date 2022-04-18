import type { ItemModelType, Modes, ResellerOrderType } from '@models/reseller-order'

export type Data = ItemModelType

export type ComponentProps = {
  entity: IResellerOrder | null
  setter: (v : IResellerOrder | null) => void
}

export type HocState = {
  data: Data[]
  loading: boolean
  mode: Modes
}

type State = {
  entity: IResellerOrder| ResellerOrderType |null
  data: Data[]
  mode: "detail" | "products" | "update-form"
}
type Action = {
  fetch(): void
  changeMode(v: State['mode']) : void
  handleClose(): void
}

export type UseResellerOrderDetail = [
  State,
  Action
]
