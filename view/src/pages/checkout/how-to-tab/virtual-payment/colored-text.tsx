import * as React from 'react';
import {createElement} from "react";
import {Box, IconButton, Tooltip} from '@mui/material';
import {ContentCopy} from "@mui/icons-material";

type P = {
  number: string
  text: string
}

export const ColoredText = ({ number, text }: P) => {
  return (
    <>
      <span>
      {text}
      </span>
      <Box sx={{color: "primary.main", ml: 1}} component='span'>
        {number}
        <Tooltip title='Copy'>
          <IconButton size='small'>
            <ContentCopy/>
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};
export function makeColoredText(p: P){
  return createElement(ColoredText, {
    ...p,
    key: p.number
  })
}
