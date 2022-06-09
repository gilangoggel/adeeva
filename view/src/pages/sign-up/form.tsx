import {TextField, Box, Grid, Divider, Button} from "@mui/material";
import {useFormUtils} from "@hooks/use-form-utils";

const sx = {
  "& .field":{
    mb:3
  },
  py:[1,10],
  px: [1,10]
}
const commonProps = {
  variant: "filled",
  InputProps:{
    disableUnderline:true
  },
  fullWidth:true,
  size:"small",
  className:"field"
} as any

const fields = [
  {
    label: "Nama",
    name: "name"
  },
  {
    label: "Alamat email",
    name: "email"
  },
  {
    label: "Password",
    name: "password",
    type: "password"
  },
  {
    label: "Konfirmasi password",
    name: "passwordConfirmation",
    type: "password"
  },
]

const initial = {
  email: "",
  password : "",
  passwordConfirmation: "",
  name: ""
}

export const Form = () => {
  const { fieldUtility, onSubmit, data } = useFormUtils<typeof initial>(initial, {method:"post"})
  return (
    <Box sx={sx} component='form' onSubmit={onSubmit(window.location.pathname)}>
      <h1>
        Bergabung dengan adeeva
      </h1>
      <Divider sx={{my: 3}}/>
      <Grid container>
        <Grid item xs={12}>
          <Grid sx={{mb: 3}} container spacing={3}>
            {
              fields.map(item=>(
                <Grid key={item.name} item xs={12} md={6}>
                  <TextField
                    {...commonProps}
                    {...item}
                    {...fieldUtility(item.name as any)}
                  />
                </Grid>
              ))
            }
            <Grid sx={{mx:"auto"}} item xs={12} md={6}>
              <Button type='submit' fullWidth variant='contained'>
                Daftar sekarang
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
