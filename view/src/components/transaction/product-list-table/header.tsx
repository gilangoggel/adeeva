import {TableCell, TableHead, TableRow} from "@mui/material";
import { renderCell } from './render-cell'


export const Header = () => {
  return (
    <TableHead>
      <TableRow sx={{
        "& > *":{
          fontWeight:"bolder"
        }
      }}>
        {
          ["Produk", 'Quantitas', 'Sub total'].map(renderCell)
        }
      </TableRow>
    </TableHead>
  );
};
