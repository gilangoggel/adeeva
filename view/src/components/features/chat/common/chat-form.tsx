import {observer} from "mobx-react";
import { FilledInput, InputAdornment, IconButton } from '@mui/material'
import { Message, Send } from '@mui/icons-material'
import {useCallback, useState} from "react";
import {useChatProvider} from "@libs/personal-chat";

export const ChatForm = observer( () => {
  const [value, setValue] = useState<string>("");
  const [,{sentMessage, emitTyping} ] = useChatProvider();
  const onSubmit =useCallback( (e: any) => {
    e.preventDefault();
    if (value){
      sentMessage(value);
      setValue("");
    }
  },[value]);
  const onKeyup = () => emitTyping()
  const onChange = useCallback( (e: any) => {
    setValue(e.target.value);
  },[])
  return (
    <div>
      <form onSubmit={onSubmit}>
        <FilledInput
          onKeyUp={onKeyup}
          value={value}
          onChange={onChange}
          disableUnderline
          startAdornment={
          <InputAdornment position='start'>
            <Message/>
          </InputAdornment>
          }
          endAdornment={
          <InputAdornment position='end'>
            <IconButton>
              <Send/>
            </IconButton>
          </InputAdornment>
          }
          hiddenLabel
          placeholder='Masukan pesan anda'
          sx={{
            borderRadius: 0,
            bgcolor:"inherit",
            '&.Mui-focused':{
              bgcolor:"inherit",
            }
        }}
          fullWidth
        />
      </form>
      <button type='submit' style={{display:"none"}}/>
    </div>
  );
});
