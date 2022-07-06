import { useHeader, Anchors } from './context'
import { Drawer } from '@mui/material'
import {PropsWithChildren} from "react";

type Props = {
  name: keyof Anchors
}

export const DrawerNode = ({ name, children }: PropsWithChildren<Props>) => {
  const [ getAnchor, _, onClose ] = useHeader();
  return (
    <Drawer
      sx={{
        zIndex: 101*100
      }}
      anchor='right'
      open={Boolean(getAnchor(name))}
      onClose={onClose}
    >
      {
        children
      }
    </Drawer>
  );
}
