import {useCreateRetur} from "@hooks/retur/use-create-retur";
import {useInputFile} from "@hooks/use-input-file";
import {Button, FormHelperText} from "@mui/material";
import { Image } from '@mui/icons-material'

export const PhotoField = () => {
  const [_, {onChange : propMaker}] = useCreateRetur();
  const fieldProps = propMaker('photo')
  const [{url, control}, {ref, onChange}] = useInputFile({
    onFileChange(){},
    parentOnChange: fieldProps.onChange,
  });
  const { helperText } = fieldProps;
  return (
    <>
      <input accept='image/*' style={{display:"none"}} type="file" name="photo" ref={ref} onChange={onChange}/>
      <img onClick={control} src={url ? url : '/assets/placeholder.png'} alt=""/>
      <div>
        <Button
          startIcon={<Image/>}
          color='secondary'
          variant='contained'
          sx={{borderRadius:3, mt:1}}
          fullWidth
          onClick={control}
        >
          Pilih foto
        </Button>
        <FormHelperText className='font-poppins' error>
          {helperText}
        </FormHelperText>
      </div>
    </>
  )
}
