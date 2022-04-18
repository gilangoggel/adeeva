import * as React from 'react';
import {Box, Paper} from "@mui/material";
import {PropsWithChildren, ReactNode} from "react";

type GroupedFieldProps = {
  flex?: boolean
  title: string
  fields: ReactNode
}

export const GroupedField = ({ flex = false, title, fields, children }: PropsWithChildren<GroupedFieldProps>) => {
  return (
    <Box sx={{display: flex ? 'flex': "block"}}>
      <Paper className='paper'>
        <h3>{title}</h3>
        {fields}
      </Paper>
      {
        children
      }
    </Box>
  );
};
