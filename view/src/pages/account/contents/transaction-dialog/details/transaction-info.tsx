import {Container} from './container'
import {useTransactionExtended} from "@components/transaction/context";
import {Grid} from '@mui/material'
import moment from "moment";
import {TransactionStatusChip} from "@components/transaction/partial/transaction-status-chip";
import {TransactionStatus} from "@root/enums/transaction-status";

const Info = ({label, content}: {label: string, content: any}) => {
  return (
    <Grid className='font-poppins' container>
      <Grid item xs={6}>
        <small>
          {label}
        </small>
      </Grid>
      <Grid item xs={6}>
        <p style={{textAlign:'right'}}>
          {content}
        </p>
      </Grid>
    </Grid>
  )
}

export const TransactionInfo = () => {

  const store = useTransactionExtended();
  console.log(
    store.status
  )
  if (store.isStatus(TransactionStatus.RECEIVED_TO_CUSTOMER)){
    console.log(
      "oke wkwkwk"
    )
  }
  return (
    <Container title='Rincian transaksi'>
      <Info label='Nomor transaksi' content={store.invoiceId}/>
      <Info label='Tanggal' content={moment(store.created_at).format("DD MMMM Y, H:mm:ss")}/>
      <TransactionStatusChip/>
    </Container>
  );
};
