import {wrapLayoutComponent} from "@utils/wrap-layout-component";
import {Box, Button, Container, Paper, TextField, Typography} from '@mui/material'
import { rootSx } from './styles'
import { motion } from 'framer-motion'
import {useFormUtils} from "@hooks/use-form-utils";
import {usePage} from "@inertiajs/inertia-react";


const initial = {
  email: "",
  password: ""
}

function Form() {
  const { fieldUtility, onSubmit, data } = useFormUtils<typeof initial>(initial)
  const { authError } = usePage().props

  return (
    <form onSubmit={onSubmit('/sign-in')}>
      <div className='field-container'>
        <TextField {...fieldUtility('email', true)} fullWidth size='small' variant='filled' label='Alamat email' />
      </div>
      <div className='field-container'>
        <TextField {...fieldUtility('password', true)} type='password' fullWidth size='small' variant='filled' label='Password' />
      </div>
      <div className="field-container">
        <Button className='font-poppins' type='submit' fullWidth variant='contained'>
          Log in
        </Button>
      </div>
      <Typography variant='caption' className='font-poppins'>
        {authError ? "Kombinasi email / password anda tidak sesuai" : ""}
      </Typography>
    </form>
  )
}

function Page() {
  return (
    <Container
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      component={motion.div}
    >
      <Box sx={rootSx}>
        <div className='container'>
          <div className="form-text" />
          <div className="form-container">
            <Paper sx={{p: 2}}>
              <h1 className='font-poppins'>
                Login
              </h1>
              <Form/>
            </Paper>
          </div>
        </div>
      </Box>
    </Container>
  );
}
export const SignIn = wrapLayoutComponent(Page)
