import {Box, Grid, Typography,Divider} from "@mui/material";
import {PropsWithChildren, ReactNode} from "react";

export type InfoNodes = {
  label: string
  content: ReactNode
}

type Props = {
  title: string
  contents: InfoNodes[]
}

const RenderNode = ({content, label}: InfoNodes) => {
  return (
    <Grid container>
      <Grid item sx={{display: 'flex'}} xs={12} md={6}>
        <Typography variant='caption'>
          {label}
        </Typography>
      </Grid>
      <Grid style={{textAlign:'right'}} item xs={12} md={6}>
        {content}
      </Grid>
    </Grid>
  )
}

export function useRenderNodes(items: InfoNodes[]){
  return items.map((props)=>(
    <RenderNode {...props} key={props.label} />
  ))
}

export const ContentContainer = ({contents, title, children}:PropsWithChildren<Props>) => {
  const nodes = useRenderNodes(contents);
  return (
    <Box sx={{
      p:2,
      border: "solid 1px",
      borderColor:"primary.light",
      m: 2,
      borderRadius: 1,
    }}>
      <Typography color='primary'>
        {title}
      </Typography>
      <Divider sx={{my:1, borderColor:"primary.light"}}/>
      {nodes}
      {children}
    </Box>
  );
};
