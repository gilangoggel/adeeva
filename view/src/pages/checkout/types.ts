import {ResellerInfo} from "@utils/checkout/types";

type CheckoutState = {
  resellers: ResellerInfo[]
  resellerOption : ResellerInfo | '__adeeva__'
}
type CheckoutAction = {}
export type UseCheckout = [CheckoutState, CheckoutAction];
