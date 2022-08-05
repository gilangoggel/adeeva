import {usePage} from "@inertiajs/inertia-react";
import {useFormUtils} from "@hooks/use-form-utils";
import {useSnackbar} from "notistack";
import {useEffect} from "react";
import {Button, TextField, Typography, Box} from "@mui/material";
import {Navigation} from "@utils/navigation";


const initial = {
  email: "",
  password: ""
}

const sx = {
  "& h2":{
    color:"secondary.main",
    mb: 4
  },
  "& .field-container":{
    mb: 4
  },
  borderRadius:50,
}

export const FormContainer = () => {
  const { registered, authError } = usePage().props as any
  const { fieldUtility, onSubmit } = useFormUtils<typeof initial>({
    ...initial,
    email: registered
  }, {disableSnackbar: true})
  const { enqueueSnackbar } = useSnackbar()
  useEffect(()=>{
    if (registered){
      enqueueSnackbar("Akun anda berhasil terdaftar")
    }
  }, [registered])
  const toSignUp = () => {
    Navigation.to("toSignUp")
  }
  return (
    <Box component='form' sx={sx} onSubmit={onSubmit('/sign-in')}>
      <h2 className='font-poppins'>
        Login kedalam akun anda
      </h2>
      <div className='field-container'>
        <TextField {...fieldUtility('email', true)} fullWidth size='small' variant='filled' label='Alamat email' />
      </div>
      <div className='field-container'>
        <TextField {...fieldUtility('password', true)} type='password' fullWidth size='small' variant='filled' label='Password' />
      </div>
      <div className="field-container">
        <Button color='secondary' className='font-poppins' type='submit' fullWidth variant='contained'>
          Log in
        </Button>
        <Button color='secondary' onClick={toSignUp} sx={{mt: 2, textTransform:"none"}} className='font-poppins' fullWidth variant='contained'>
          Klik disini untuk mendaftar ?
        </Button>
      </div>
      <Typography sx={{textAlign:'center', display:"block"}} color='error' variant='caption' className='font-poppins'>
        {authError ? "Kombinasi email / password anda tidak sesuai" : ""}
      </Typography>
    </Box>
  );
};
