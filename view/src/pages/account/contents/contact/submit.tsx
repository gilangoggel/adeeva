import { Button } from '@mui/material'
import {Save} from "@mui/icons-material";
import { useContactForm } from './use-contact-form'

export const Submit = () => {
  const {onSubmit, loading} = useContactForm()[2];
  return (
    <div style={{textAlign:'right'}}>
      <Button
        disabled={loading}
        onClick={onSubmit}
        type='submit'
        startIcon={
        <Save/>
      }
        color='secondary'
        variant='contained'
        sx={{borderRadius:3}}
      >
        Simpan
      </Button>
    </div>
  );
};
