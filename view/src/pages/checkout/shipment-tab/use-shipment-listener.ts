import {useCheckoutPage} from "@stores/checkout";
import {useToggle} from "@hooks/use-toggle";
import {useCart} from "@stores/cart-store";
import {useEffect, useMemo} from "react";
import {CalculateCost} from "@utils/checkout/calculate-cost";

const costCalculator = new CalculateCost()

const useDeps = () => {
  const store = useCheckoutPage();
  const cart = useCart();
  const reseller = store.selected;
  const destination = store.shipment.formData.cityId;
  const expedition = store.shipment.formData.expedition;
  const isLoaded = store.shipment.shipmentHasLoaded;
  return useMemo(() => {
    return {
      shouldFetch: reseller === "__adeeva__" && expedition && !isLoaded,
      cart,
      destination,
      expedition
    }
  }, [
    reseller,
    destination,
    cart,
    expedition,
    isLoaded
  ]);
}

export const useShipmentListener = () => {
  const store = useCheckoutPage();
  const [ loading, _, {inline} ] = useToggle()
  const deps = useDeps();
  useEffect(()=>{
    const { shouldFetch, destination, expedition, cart } = deps;
    if (shouldFetch){
      costCalculator.setItems(cart)
      costCalculator.setDestination(destination)
      costCalculator.setExpedition(expedition as any)
      inline(true)
      costCalculator.dipatch().then(response=>{
        store.shipment.setShipmentInfo(response);
        inline(false)
      });
    }
  },[deps])
  return loading;
}
