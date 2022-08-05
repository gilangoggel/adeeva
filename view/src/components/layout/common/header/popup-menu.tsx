import {PropsWithChildren} from "react";
import {Menu} from "@mui/material";

export type Props = {
  anchor: HTMLElement | null
  handleClose(): void
}

export const PopupMenu = ({anchor, handleClose, children} : PropsWithChildren<Props>) => {
  return (
    <Menu
      PaperProps={{
        elevation: 10,
        sx:{
          borderRadius:10,
        }
      }}
      disableScrollLock
      anchorOrigin={{
      vertical : "bottom",
      horizontal: -100
    }} open={Boolean(anchor)} anchorEl={anchor} onClose={handleClose}>
      {children}
    </Menu>
  );
};
