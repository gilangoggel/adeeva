import * as React from "react";
import { Button } from "@mui/material";
import { ShoppingCartCheckout, PointOfSale } from "@mui/icons-material";

export const UserControl = () => {
  return (
    <>
      <Button startIcon={<PointOfSale />}>Transaksi</Button>
      <Button startIcon={<ShoppingCartCheckout />}>Keranjang</Button>
    </>
  );
};
