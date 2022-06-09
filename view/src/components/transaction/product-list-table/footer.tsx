import {TableCell, TableFooter, TableRow} from "@mui/material";
import {formatMoney} from "@utils/format-money";
import { useTransactionExtended } from '../context'
import {observer} from "mobx-react";

export const Footer = observer( () => {
  const store = useTransactionExtended();
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={2}>
          Total
        </TableCell>
        <TableCell colSpan={2}>
          : Rp {formatMoney(store.beforShipping)}
        </TableCell>
      </TableRow>
    </TableFooter>
  );
});
