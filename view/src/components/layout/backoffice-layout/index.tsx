import type { ComponentProps } from './types'
import {Header} from "./header";
import {Box, Container} from "@mui/material";
import {root} from "./styles";
import type {PropsWithChildren} from "react";
import { BackOfficeProvider } from './provider'
import { Navigator } from './navigator'

export const BackofficeLayout = ({children, ...props} : PropsWithChildren< ComponentProps>) => {
  return (
    <BackOfficeProvider {...props}>
      <Header/>
      <Box sx={root}>
        <div className="navigator">
          <Navigator/>
        </div>
        <div className="content">
          <div className="wrap">
            <Container>
              {children}
            </Container>
          </div>
        </div>
      </Box>
    </BackOfficeProvider>
  );
};
