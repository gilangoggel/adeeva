import * as React from "react";
import { Container, AppBar, Typography, Button, Box } from "@mui/material";
import { Home, Search, ShowChart } from "@mui/icons-material";
import { observer } from "mobx-react";
import { useAuth } from "../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { UserControl } from "./user-control";
import { Cart } from "../../features/cart";

const pageControlSx = {
  ml: "auto",
  "& > button": {
    color: "white",
    textTransform: "none",
    borderRadius: 5,
  },
};

const AuthControl = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate("/signin")}>Sign in</Button>
      <Button onClick={() => navigate("/signup")}>Sign up</Button>
    </>
  );
};

const PageControl = observer(() => {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <Box sx={pageControlSx}>
      <Button
        startIcon={<Home />}
        onClick={() => navigate("/")}
        sx={{ color: "white" }}
      >
        Home
      </Button>
      <Button startIcon={<Search />} sx={{ color: "white" }}>
        Pencarian
      </Button>
      {!auth.user ? <AuthControl /> : null}
      {auth.user && ["ADMINISTRATOR", "RESELLER"].includes(auth.user.role) ? (
        <Button
          onClick={() => navigate("/backoffice/dashboard")}
          startIcon={<ShowChart />}
        >
          Backoffice
        </Button>
      ) : null}
      {auth.user && auth.user.role === "USER" ? <UserControl /> : null}
    </Box>
  );
});

export const Header = () => {
  return (
    <Box
      sx={{ position: "fixed", width: "100vw", top: 0, left: 0, zIndex: 10 }}
    >
      <Container sx={{ pt: 1 }}>
        <AppBar
          sx={{
            alignItems: "center",
            borderRadius: 10,
            px: 2,
            py: 1,
            display: "flex",
            flexDirection: "row",
          }}
          position="static"
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bolder" }}>Adeeva group</Typography>
            <Box sx={{ ml: 2 }}>
              <Cart />
            </Box>
          </Box>
          <PageControl />
        </AppBar>
      </Container>
    </Box>
  );
};
