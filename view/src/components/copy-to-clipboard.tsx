import {useCopyToClipboard} from "react-use";
import {PropsWithChildren} from "react";
import {IconButton} from "@mui/material";
import {CopyAll} from "@mui/icons-material";

type Props = {
  text: string
  alertText?: string
  align ?: 'center' | 'right'
}
export const CopyToClipboard = ({text, alertText, children, align = 'center'}: PropsWithChildren<Props>) => {
  const [, copy ] = useCopyToClipboard()
  const handler = ()=>{
    copy(text);
    if (alertText) alert(alertText);
  }
  return (
    <div>
      <div style={{display: 'flex', justifyContent:align, alignItems:'center'}}>
        {children}
        <div>
          <IconButton size='small' onClick={handler} sx={{ml:1}}>
            <CopyAll/>
          </IconButton>
        </div>
      </div>
    </div>
  );
};
