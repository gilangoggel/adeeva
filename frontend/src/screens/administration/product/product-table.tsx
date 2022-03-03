import * as React from "react";
import {
  IconButton,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import { usePaginatorContext } from "../../../hooks/use-paginator";
import { Delete, Edit, Info } from "@mui/icons-material";
import { useProductPage } from "./provider";
import { moneyFormat } from "../../../utilities/money-format";

export const ProductTable = () => {
  const [data] = usePaginatorContext();
  const { openModal } = useProductPage();

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "20%" }}>Nama produk</TableCell>
            <TableCell sx={{ width: "20%" }}>Kategori</TableCell>
            <TableCell sx={{ width: "20%" }}>Harga customer</TableCell>
            <TableCell sx={{ width: "20%" }}>Harga reseller</TableCell>
            <TableCell sx={{ width: "20%" }}>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{moneyFormat(item.price)}</TableCell>
              <TableCell>{moneyFormat(item.reseller_price)}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => openModal("detail", item)}
                  color="primary"
                  size="small"
                >
                  <Info />
                </IconButton>
                <IconButton
                  onClick={() => openModal("update", item)}
                  color="warning"
                  size="small"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => openModal("delete", item)}
                  size="small"
                  color="error"
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
