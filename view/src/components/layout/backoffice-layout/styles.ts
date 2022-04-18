import type {Theme} from "@mui/material";

export const root = {
  height: "100vh",
  width: "100vw",
  overflow: 'hidden',
  display: 'flex',
  "& .navigator":{
    width:[0, '30%', '20%', '15%'],
    height:"100vh",
    bgcolor:"white",
    boxShadow:2,
    '& > .wrap':{
      mt: (t: Theme)=>`${(t.mixins.toolbar.minHeight as number) + 10}px`,
      height:(t: Theme) => `calc(100vh - ${t.mixins.toolbar.minHeight}px)`,
      overflowY:"auto"
    },
  },
  '& .content':{
    width:[0, '70%', '80%', '85%'],
    '& > .wrap':{
      mt: (t: Theme)=>`${(t.mixins.toolbar.minHeight as number) + 10}px`,
      height:(t: Theme) => `calc(100vh - ${(t.mixins.toolbar.minHeight as number) + 10}px)`,
      overflowY:"auto"
    },
  },
}
