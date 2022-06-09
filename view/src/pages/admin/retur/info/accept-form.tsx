import {Box, Button} from '@mui/material'
import {observer} from "mobx-react";
import {useAcceptRetur} from "@hooks/retur/use-accept-retur";
import {ITransactionRetur} from "@models/transaction-extended/transaction-retur";
import {useEffect} from "react";

type Props = {
  store: ITransactionRetur
}

export const AcceptForm = observer( ({store}: Props) => {
  const [ response, loading, run ] = useAcceptRetur(store);
  useEffect(()=>{
    if (response && response.accepted){
      store.accept();
    }
  },[response])
  return (
    <Box sx={{mb: 2}}>
      <Button fullWidth onClick={run} disabled={store.accepted || loading} variant='contained'>
        Setujui
      </Button>
    </Box>
  );
});
