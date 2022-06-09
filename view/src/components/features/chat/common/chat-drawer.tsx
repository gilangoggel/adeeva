import { Drawer } from '@mui/material'
import { SystemCssProperties } from '@mui/system'
import {PropsWithChildren} from "react";

type Props = {
  open: boolean
  onClose(): void
  width ?: SystemCssProperties['width']
}

export const ChatDrawer = ({width ,...props}: PropsWithChildren<Props>) => {
  return (
    <Drawer
      {...props}
      anchor='right'
      PaperProps={{
        sx:{
          width : width ? width: "30vw",
          height: '100vh',
          overflow: 'hidden'
        }
      }}
    >
    </Drawer>
  );
};
