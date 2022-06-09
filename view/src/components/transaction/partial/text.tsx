import { InfoNodes } from '../content-container'
import {Typography} from "@mui/material";
import {formatMoney} from "@utils/format-money";
import {ReactNode} from "react";

export const Text = (label: string,content: any, isMoney = false, afterContent?: ReactNode = null) : InfoNodes => {
  return {
    label, content : (
      <Typography variant='caption'>{ isMoney ? `Rp ${formatMoney(content)}` : content} {afterContent}</Typography>
    )
  };
};
