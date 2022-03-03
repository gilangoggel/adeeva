import * as React from "react";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { useProductPage } from "../provider";
import { observer } from "mobx-react";
import { useUpdateProduct } from "../utility/use-update-product";
import { Fields } from "./components/fields";
import { FormProvider } from "react-hook-form";
import { UploadField } from "./components/upload-field";

const Node = observer(() => {
  const { form, handleSubmit, loading } = useUpdateProduct();
  const { mode, closeModal } = useProductPage();
  return (
    <Dialog open={mode === "update"} onClose={closeModal}>
      <DialogContent>
        <Typography sx={{ mb: 2, fontWeight: "bolder" }} variant="h5">
          Edit produk
        </Typography>
        <FormProvider {...form}>
          <Fields />
          <Box sx={{ mt: 2 }}>
            {mode === "update" ? <UploadField form={form} /> : null}
          </Box>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              Simpan
            </Button>
          </Box>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
});

export const UpdateForm = observer(() => {
  return <Node />;
});
