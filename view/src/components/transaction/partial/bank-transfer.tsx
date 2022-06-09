import {Box, Typography} from "@mui/material";
import {CopyToClipboard} from "@components/copy-to-clipboard";

export const BankTransfer = ({va}: {va: string}) => {
  return (
    <Box sx={{textAlign: 'center', mt: 2}}>
      <Typography variant='caption'>
        Nomor virtual account
      </Typography>
      <CopyToClipboard text={va} alertText='Nomor virtual account tersalin'>
        <Typography variant='h4'>
          {va}
        </Typography>
      </CopyToClipboard>
    </Box>
  );
};
