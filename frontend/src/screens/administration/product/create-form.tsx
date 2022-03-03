import * as React from "react";
import { Button } from "@mui/material";
import { useProductPage } from "./provider";

export const CreateForm = () => {
  const { openModal } = useProductPage();
  return (
    <div>
      <Button
        onClick={() => openModal("create", null)}
        variant="contained"
        sx={{ borderRadius: 5 }}
      >
        Tambah produk
      </Button>
    </div>
  );
};
