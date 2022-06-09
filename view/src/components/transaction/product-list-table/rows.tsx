import {observer} from "mobx-react";
import {TableBody, TableCell, TableRow} from "@mui/material";
import {formatMoney} from "@utils/format-money";
import { useTransactionExtended } from '../context'
import { renderCell } from './render-cell'

export const Rows = observer( () => {
  const store = useTransactionExtended();
  return (
    <TableBody>
      {
        store.items.map((item: any)=>(
          <TableRow key={item.id}>
            {renderCell(item.product.name)}
            {renderCell(`${item.amount} pcs`)}
            {renderCell(`Rp ${formatMoney(item.total)}`)}
          </TableRow>
        ))
      }
    </TableBody>
  );
});
