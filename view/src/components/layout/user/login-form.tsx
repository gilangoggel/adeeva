import {Box, Button, TextField} from '@mui/material'
import { useForm } from '@inertiajs/inertia-react'
import {useFormUtils} from "@hooks/use-form-utils";

const sx = {
  "& h2": {
    fontWeight: "normal"
  },
  minWidth: 300,
  "& .field-container": {
    py: 2
  }
}

const initial = {
  email: "",
  password : ""
}
type Values = typeof initial;

const Form = () => {

  const { onSubmit, fieldUtility, errors } = useFormUtils<Values>(initial)
  console.log(errors)

  return (
    <form onSubmit={onSubmit('/sign-in')}>
      <div className="field-container">
        <TextField {...fieldUtility('email')} variant='filled' label='Alamat email' fullWidth/>
      </div>
      <div className="field-container">
        <TextField {...fieldUtility('password')} variant='filled' label='Password' fullWidth/>
      </div>
      <div className="field-container">
        <Button type='submit' color='primary' className='font-poppins' fullWidth variant='contained'>
          Login
        </Button>
      </div>
    </form>
  )
}

export function LoginForm() {

  return (
    <Box sx={sx}>
      <h2 className='font-poppins'>
        Login
      </h2>
      <Form/>
    </Box>
  );
}
