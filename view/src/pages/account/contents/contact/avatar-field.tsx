import { useContactForm } from './use-contact-form'
import {useInputFile} from "@hooks/use-input-file";
import {Button, Avatar, Box} from "@mui/material";
import {useAuth} from "@hooks/use-auth";

export const AvatarField = () => {
  const [{picture}, change ] = useContactForm();
  const onFileChange = (file: File) => {
    change('picture', file);
  }
  const auth = useAuth();

  const [{control, file, url}, inputProps] = useInputFile({
    onFileChange,
    initialUrl:picture as string
  })

  return (
    <Box sx={{px:1}}>
      <Box sx={{display:'flex',justifyContent: 'center', py:3}}>
        <Avatar sx={{height:100,width:100,boxShadow:3}} src={url}>
          {auth.name[0]}
        </Avatar>
      </Box>
      <input accept='image/*' style={{display:"none"}} type="file" {...inputProps as any}/>
      <Button
        size='small'
        variant='contained'
        color='secondary'
        sx={{borderRadius:3}}
        fullWidth
        onClick={control}
      >
        Pilih foto
      </Button>
    </Box>
  );
};
