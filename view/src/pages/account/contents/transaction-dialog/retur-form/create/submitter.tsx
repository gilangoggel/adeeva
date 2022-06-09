import {Button} from "@mui/material";
import {ForwardToInbox} from "@mui/icons-material";
import { useCreateRetur } from '@hooks/retur/use-create-retur'

export const Submitter = () => {
  const [ , {onSubmit}] = useCreateRetur()
  return (
    <div style={{textAlign:'right'}}>
      <Button
        onClick={onSubmit}
        startIcon={
        <ForwardToInbox/>
        }
        variant='contained'
        color='secondary'
        sx={{borderRadius:3}}
      >
        Ajukan pengembalian
      </Button>
    </div>
  );
};
