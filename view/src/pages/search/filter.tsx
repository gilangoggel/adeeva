import * as React from 'react';
import {TextField, Box} from "@mui/material";
import { useQuery } from './query-provider'
import { useAfterSubmit } from './layout'

export const Filter = () => {
  const [ {keyword}, {changeKeyword} ] = useQuery();
  const [internal, setInternal] = React.useState<string>(keyword);
  const handleChange = (e: any ) => setInternal(e.target.value);
  const afterSubmit = useAfterSubmit();
  const handleSubmit = (e : any) => {
    changeKeyword(internal);
    e.preventDefault();
    afterSubmit();
  };
  return (
    <Box sx={{p: 1}} component='form' onSubmit={handleSubmit}>
      <TextField
        onChange={handleChange}
        value={internal}
        InputProps={{
          disableUnderline:true
        }}
        fullWidth
        variant='filled'
        hiddenLabel
        placeholder='Masukan kata kunci pencarian'
      />
      <div style={{display: 'none'}}>
        <button type='submit'/>
      </div>
    </Box>
  );
};
