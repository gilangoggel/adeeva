import {PropsWithChildren, ReactNode} from "react";
import {Box} from "@mui/material";

const sx = {
  display: 'flex',
  flexDirection: "column",
  height: "100vh",
  '& .header':{

  },
  '& .footer':{

  },
  '& .content':{
    flex:1,
    overflowY:"auto",
    pb:3,
  }
}
type Props = {
  footer?: ReactNode
  header: ReactNode
}

export const DrawerContentLayout = ({ footer, header, children }: PropsWithChildren<Props>) => {
  return (
    <Box sx={sx}>
      <div className="header">
        {header}
      </div>
      <div className="content overlay-scrollbar">
        {children}
      </div>
      <div className="footer">
        {footer}
      </div>
    </Box>
  );
};
