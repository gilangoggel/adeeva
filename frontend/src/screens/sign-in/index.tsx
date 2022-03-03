import * as React from "react";
import { observer } from "mobx-react";
import { Base } from "../../layouts/base";
import { Box, Button, TextField, Typography } from "@mui/material";
import scene8 from "../../assets/svg/Scenes/Scenes08.svg";
import { FormContainer } from "./form-container";

const sx = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& > div": {
    width: ["100%", "50%", "50%", "50%"],
    height: "100%",
  },
  "& > .illustration": {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "primary.main",
    "& > div": {
      width: "90%",
      height: "90%",
    },
  },
  "& > .form-container": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > div": {
      width: "50%",
      p: 2,
      borderRadius: 5,
    },
  },
};

export const SignIn = observer(() => {
  return (
    <Base>
      <Box sx={sx}>
        <div className="form-container">
          <div>
            <Typography sx={{ fontWeight: "bolder" }}>
              Selamat datang
            </Typography>
            <Typography>
              Silahkan login dengan menggunakan alamat email & password anda
            </Typography>
            <FormContainer />
          </div>
        </div>
        <div className="illustration">
          <div>
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "100%",
              }}
              src={scene8}
              alt=""
            />
          </div>
        </div>
      </Box>
    </Base>
  );
});
