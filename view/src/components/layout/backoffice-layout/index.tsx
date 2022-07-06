import type { ComponentProps } from './types'
import {Header} from "./header";
import {Box, Container} from "@mui/material";
import {root} from "./styles";
import type {PropsWithChildren} from "react";
import { BackOfficeProvider } from './provider'
import { Navigator } from './navigator'
import { useAppHeader, AppHeaderContext } from '../common/contexts/use-app-header'
import {useAuth} from "@hooks/use-auth";
import {observer} from "mobx-react";

export const BackofficeLayout = observer( ({children, ...props} : PropsWithChildren< ComponentProps>) => {
  const context = useAppHeader();
  const auth = useAuth();
  if (! auth){
    return <></>
  }
  return (
    <AppHeaderContext.Provider value={context}>
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
    </AppHeaderContext.Provider>
  );
});
