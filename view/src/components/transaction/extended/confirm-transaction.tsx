import {Fragment, ReactNode, useCallback, useEffect} from "react";
import {observer} from "mobx-react";
import {useTransactionExtended} from "@components/transaction/context";
import {useFormRequest} from "@hooks/use-form-request";
import {Inertia} from "@inertiajs/inertia";

type ChildProps = {
  handler():void;
  isDisabled: boolean;
}

type Props = {
  children(props: ChildProps) : ReactNode
  isAdmin?: boolean
}

export const ConfirmTransaction = observer(({ children }: Props )=>{
  const model = useTransactionExtended();
  const status = model.status;
  const [response, loading, {run} ] = useFormRequest<any>({
    path: `/transaction/${model.id}/complete`,
    successMessage: "Terima kasih telah dikonfirmasi",
    method: "put"
  })
  useEffect(()=>{
    if (response){
      model.update({status: "5"});
      Inertia.reload({preserveState:true, preserveScroll:true});
    }
  },[response])

  const handler = useCallback(()=>{
    run({});
  }, [])
  if (["4","5"].includes(status)){
    return <Fragment>
      {
        children({handler, isDisabled:status == "5" || loading})
      }
    </Fragment>
  }
  return (
    <Fragment/>
  )
})