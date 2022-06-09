import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Menu,
  IconButton,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button
} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {useGlobalStore} from "@root/provider/globar-store-provider";
import {observer} from "mobx-react";
import {useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {useFormUtils} from "@hooks/use-form-utils";

type LinkItem = {
  text : string
  to: string
}

const commonLinks : LinkItem[] = [
  {
    to: "/account",
    text: "Akun saya"
  },
]

const rootSx = {
  "& h4":{
    fontWeight: "normal",
    textTransform:"capitalize"
  },
  minWidth:300,
  "& > div":{
    px:1
  },
  "& .divider":{
    my:1
  }
}

const navigate = (path: string) => {
  Inertia.get(path)
}

const Links = ({ links } : {links: LinkItem[]}) => {
  return (
    <List dense sx={{px: 0}}>
      {
        links.map(item=>(
          <ListItem onClick={()=>navigate(item.to)} sx={{px: 0}}  button key={item.to}>
            <ListItemText primaryTypographyProps={{
              className: "font-poppins"
            }} sx={{px: 1}} primary={item.text}/>
          </ListItem>
        ))
      }
    </List>
  )
}

type LogoutDialogProps = {
  open: boolean
  onCancel() : void
}

export const LogoutDialog = ( { onCancel, open } : LogoutDialogProps) => {
  const { onSubmit } = useFormUtils({}, {disableSnackbar: true})
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>
        Konfirmasi keluar
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Apakah anda yakin untuk keluar dari akun anda
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{justifyContent: 'space-between'}}>
        <Button
          onClick={onCancel}
          sx={{
            textTransform: "none"
          }}>
          Tutup
        </Button>
        <Button
          onClick={onSubmit("/logout")}
          sx={{
            textTransform: "none",
            bgcolor:'error.light'
          }}
          variant='contained' color='error'>
          Keluar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

type P = {
  disableBackoffice?: boolean
}

export const UserControl = observer( ({disableBackoffice = false}: P) => {
  const { user } = useGlobalStore();
  const [ anchor, setAnchor ] = useState<HTMLButtonElement | null>(null);
  const backofficeLink = () : LinkItem[] => {
    return disableBackoffice ? [] : [
      {
        to: user?.role === "ADMINISTRATOR" ? "/admin/dashboard" : "/reseller/dashboard",
        text: user?.role === "ADMINISTRATOR" ? "Administrasi" : "Backoffice"
      }
    ]
  }
  const handleOpen = (event: any) => {
    setAnchor(event.target)
  }
  const handleClose = () => {
    setAnchor(null)
  }
  const [openLogout, setOpenLogout] = useState<boolean>(false);
  const onLogoutClick = () => {
    setOpenLogout(true)
    setTimeout(handleClose, 100)
  }
  const onLogoutCancel = () => setOpenLogout(false)
  return (
    <>
      <Menu PaperProps={{
        elevation: 2
      }} open={Boolean(anchor)} anchorEl={anchor} onClose={handleClose}>
        <Box className='font-poppins' sx={rootSx}>
          <div>
            <h4>
              {user?.name}
            </h4>
            <p>
              {user?.email}
            </p>
          </div>
          {
            !disableBackoffice ?
              <>
                <Divider className='divider'/>
                <Links links={backofficeLink()}/>
                <Divider className='divider'/>
              </> : null
          }
          <Links links={commonLinks}/>
          <ListItem onClick={onLogoutClick} sx={{px: 0}}  button>
            Keluar
          </ListItem>
        </Box>
      </Menu>
      <LogoutDialog open={openLogout} onCancel={onLogoutCancel}/>
      <IconButton onMouseEnter={handleOpen}>
        <AccountCircle/>
      </IconButton>
    </>
  );
});
