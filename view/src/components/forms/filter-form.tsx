import {ReactNode, useCallback, useState} from "react";
import {useListPage} from "@components/list-page";
import {Box, Button} from '@mui/material'
import {ExitToApp as FilterIcon, RotateLeft} from "@mui/icons-material";

type CProps = {
  makeHandler(name: string, isEvent?: boolean) : (v: any)=>void
  values: Record<string, any>
}

type Props = {
  children(props : CProps): ReactNode
}

export const FilterForm = ({children}: Props) => {
  const [params, setParams] = useState<Record<string, any>>({});

  const onFieldChange = useCallback( (name :string, isEvent = true) => {
    return (e: any) =>{
      const cb = (val: any) => {
        setParams((prev)=>({
          ...prev,
          [name] : val ? val: undefined
        }))
      }
      if (isEvent){
        return cb(e.target.value)
      }
      return cb(e)
    }
  }, [])
  const [, {updateParams}] = useListPage();
  const onSubmit = useCallback( (e: any) => {
    e.preventDefault();
    updateParams(params)
  }, [updateParams, params])
  const onReset = useCallback( () => {
    const keys = Object.keys(params);
    const obj : Record<string, any> = {};
    keys.forEach(k=>{
      obj[k] = undefined;
    })
    updateParams(obj)
  }, [params])

  return (
    <form onReset={onReset} onSubmit={onSubmit}>
      <Box sx={{display: 'flex', alignItems: "center"}}>
        {
          children({
            makeHandler: onFieldChange,
            values: params
          })
        }
        <Box sx={{ml:'auto'}}>
          <Button
            sx={{mr: 1}}
            onClick={onReset}
            type='reset'
            startIcon={
              <RotateLeft/>
            }
            size='small'
            className='font-poppins'
            variant='contained'
          >
            Reset
          </Button>
          <Button
            startIcon={
              <FilterIcon/>
            }
            size='small'
            className='font-poppins'
            type='submit'
            variant='contained'
          >
            Terapkan
          </Button>
        </Box>
      </Box>
    </form>
  );
};
