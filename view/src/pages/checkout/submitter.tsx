import {observer} from "mobx-react";
import {useCheckoutPage} from "@stores/checkout";
import {Button} from "@mui/material";
import {Inertia} from "@inertiajs/inertia";
import {useToggle} from "@hooks/use-toggle";
import {LoadingBackdrop} from "@components/loading-backdrop";

export const Submitter = observer( () => {
  const store = useCheckoutPage();
  const isDisabled = !store.isSubmitDisabled
  const [ loading, _,{toggleCallback} ] = useToggle()
  const doPayment = () =>{
    return Inertia.post("/checkout", store.formdata as any, {
      preserveState: true,
      onFinish: toggleCallback(false),
      onStart: toggleCallback(true)
    })
  }
  return (
    <>
      <LoadingBackdrop open={loading}/>
      <Button disabled={isDisabled} color='secondary' onClick={doPayment} variant='contained' sx={{mt:2}} fullWidth>
        Checkout
      </Button>
    </>
  );
});
