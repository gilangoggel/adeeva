import * as React from "react";
import { Dialog, DialogContent } from "@mui/material";
import { useProductPage } from "../provider";

export const Detail = () => {
  const { mode, closeModal } = useProductPage();

  return (
    <Dialog open={mode === "detail"} onClose={closeModal}>
      <DialogContent>
        <h1>detail info</h1>
      </DialogContent>
    </Dialog>
  );
};
