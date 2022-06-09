import {ITransactionRetur} from "@models/transaction-extended/transaction-retur";
import {Box, Divider} from "@mui/material";

const sx = {
  maxWidth:['40vw','40vw','40vw', '30vw'],
  '& img':{
    width :"100%",
    maxHeight:256,
    borderRadius:2,
    mb:3
  }
}

export const ReturDetail = ({store}: {store: ITransactionRetur}) => {
  return (
    <Box sx={sx}>
      <img src={store.photo} alt=""/>
      <h2 className='font-raleway'>
        Alasan pengembalian
      </h2>
      <Divider sx={{my:2}}/>
      <p className='font-poppins'>
        {store.reason}
      </p>
    </Box>
  );
};
