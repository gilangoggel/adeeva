import {Grid} from "@mui/material";
import { Form } from './form'
import { CommentList } from './comment-list'

export const Container = () => {
  return (
    <Grid container spacing={2} style={{minHeight: "80vh"}}>
      <Grid item sm={12} md={8}>
        <CommentList/>
      </Grid>
      <Grid item sm={12} md={4}>
        <Form/>
      </Grid>
    </Grid>
  );
};
