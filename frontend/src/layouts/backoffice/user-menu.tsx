import * as React from "react";
import { useAuth } from "../../hooks/use-auth";
import { observer } from "mobx-react";
import { AccountCircle, ExitToApp, Settings } from "@mui/icons-material";
import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const buttonSx = {
  bgcolor: "white",
  "&:hover": {
    bgcolor: "white",
  },
  color: "black",
  borderRadius: 10,
  textTransform: "capitalize",
};

const Navigator = observer(() => {
  const auth = useAuth();
  const user = auth.user;
  const navigate = useNavigate();
  const toAccountSetting = useCallback(() => {
    navigate("/account");
  }, [navigate]);
  const onLogout = useCallback(() => {
    navigate("/");
    auth.removeUser();
  }, [auth]);

  if (!user) {
    return <></>;
  }
  return (
    <>
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="body1">{user.name}</Typography>
        <Typography variant="body2">{user.email}</Typography>
      </Box>
      <Divider />
      <MenuItem onClick={toAccountSetting}>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText secondary="Pengaturan akun" />
      </MenuItem>
      <MenuItem onClick={onLogout}>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText secondary="Keluar" />
      </MenuItem>
    </>
  );
});

export const UserMenu = observer(() => {
  const auth = useAuth();
  const user = auth.user;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLButtonElement>(
    null
  );
  const toggler = (e: any) => {
    setAnchorEl(!anchorEl ? e.currentTarget : null);
  };
  const handleClose = () => setAnchorEl(null);

  if (!user) {
    return <></>;
  }
  return (
    <>
      <Button
        onClick={toggler}
        sx={buttonSx as any}
        variant="contained"
        startIcon={<AccountCircle />}
      >
        {user.name}
      </Button>
      <Menu
        onClose={handleClose}
        sx={{ p: 0 }}
        PaperProps={{
          elevation: 2,
          sx: {
            p: 0,
            minWidth: 200,
          },
        }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
      >
        <Navigator />
      </Menu>
    </>
  );
});
