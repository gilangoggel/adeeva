import {TableCell} from "@mui/material";

export const renderCell = (node: any) => {
  return (
    <TableCell sx={{width: "33%", fontSize:"small"}} key={node}>
      {node}
    </TableCell>
  )
}
