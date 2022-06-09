import {observer} from "mobx-react";
import { useTransactionExtended } from './context'
import {useToggle} from "@hooks/use-toggle";
import {ComponentType, ReactNode} from "react";
import {Button} from "@mui/material";
import {TransactionStatus} from "@root/enums/transaction-status";
import {useSnackbar} from "notistack";

export function useCompleteTransaction() : [boolean,boolean, ()=>Promise<any>]{
  const transaction = useTransactionExtended();
  const [ loading, toggle, {inline} ] = useToggle()
  const { enqueueSnackbar } = useSnackbar();
  const run = async () => {
    return transaction.doAdminCompletion().then(()=>{
      setTimeout(()=>{
        if (transaction.status === TransactionStatus.RECEIVED_TO_CUSTOMER){
          enqueueSnackbar('Data berhasil diubah', {
            variant: "info",
          })
        }
        inline(false)
      }, 500)
    })
  }
  const n = parseInt(transaction.status);

  const isCompleteDisabled = () =>{
    return [2,4,5].includes(n)
  }
  console.log(
    "Disabled : ",loading
  )

  return [
    loading,
    isCompleteDisabled() || loading,
    run
  ]
}

type ChildProps = {
  onClick(): void
  disabled: boolean
  loading: boolean
}

type Props = {
  children?(props: ChildProps): ReactNode
}

const Default = ({onClick, disabled}: ChildProps) => {
  return (
    <Button disabled={disabled} onClick={onClick}>
      Selesaikan transaksi
    </Button>
  )
}

// @ts-ignore
export const CompleteTransaction = observer( ({children}: Props) => {
  const [ loading, disabled ,handler ] = useCompleteTransaction();
  const node = (children ? children : Default)
  return node({
    loading,
    onClick: handler,
    disabled
  }) as ReactNode
}) as ComponentType<Props>
