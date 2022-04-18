import {IconButton, Tooltip, Menu, Box, Dialog, DialogContent} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {useState} from "react";
import { LoginForm } from './login-form'

export function AuthControl() {

  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement| null>(null);
  const open = Boolean(anchorElement);

  const handler = (e: any) => {
    setAnchorElement(anchorElement ? null: e.target as HTMLButtonElement)
  }
  const handleOpen = (e: any) => {
    setAnchorElement(e.target)
  }

  return (
    <>
      <Tooltip title='Pengguna'>
        <IconButton onMouseEnter={handleOpen}>
          <AccountCircle/>
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handler}>
        <DialogContent>
          <LoginForm/>
        </DialogContent>
      </Dialog>
    </>
  );
}
