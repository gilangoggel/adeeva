import { Button , Box, FormHelperText} from "@mui/material";
import {Image} from "@mui/icons-material";
import {useEffect, useRef, useState} from "react";


type Props = {
  value: string
  onChange(v?: File) : void
  name: string
  helperText: string
  error:boolean
}

const placeHolderSx = {
  height: 256,
  display: "flex", alignItems: 'center', justifyContent: "center",
  bgcolor: "rgba(196,196,196,0.59)",
  boxShadow:2,
  borderRadius:2,
  color:"primary.dark",
  mt: 2,
}
const imageSx = {
  width: '100%',
  height: 300,
  mt: 3,
  boxShadow:2,
  borderRadius:1,
  cursor:"pointer",
  "&:hover":{
    boxShadow:3,
  },
  transition: "all ease .8s"
}

export const ImageField = ({value, onChange, error, helperText}: Props) => {
  const [src, setSrc] = useState<string>(value ?? "")
  const ref = useRef<HTMLInputElement>();
  console.log(helperText);

  useEffect(()=>{
    if (value){
      onChange(undefined);
    }
  }, [])


  const onFileChange = (e: any) => {
    if (e.target && e.target.files[0]){
      const file = e.target.files[0] as File;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSrc(reader.result as string);
        onChange(file);
      }
    }
  }
  const onButtonClick = () => {
    if (ref.current){
      return ref.current?.click();
    }
  }

  return (
    <div>
      <Button
        fullWidth
        variant='contained'
        className='font-poppins'
        onClick={onButtonClick}
        startIcon={
        <Image/>
        }
      >
        Pilih foto
      </Button>
      {
        ! src ?
          <Box sx={placeHolderSx}>
            <p className='font-poppins'>
              Silahkan pilih foto
            </p>
          </Box> : (
            <Box
              onClick={onButtonClick}
              src={src}
              component='img' sx={imageSx}/>
          )
      }
      <FormHelperText>
        Klik foto untuk memilih foto lainya
      </FormHelperText>
      {
        error ?
          <FormHelperText error>
            {helperText}
          </FormHelperText> : null
      }
      <input
        style={{display: "none"}}
        type="file"
        accept='image/*'
        ref={ref as any}
        onChange={onFileChange}
      />
    </div>
  );
};
