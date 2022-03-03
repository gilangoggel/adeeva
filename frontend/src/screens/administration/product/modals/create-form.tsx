import * as React from "react";
import { Box, Button, Typography, Dialog, DialogContent } from "@mui/material";
import { useProductPage } from "../provider";
import { UploadField } from "./components/upload-field";
import { FormProvider } from "react-hook-form";
import { useCreateProduct } from "../utility/use-create-product";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { Fields } from "./components/fields";
import { usePaginatorContext } from "../../../../hooks/use-paginator";

export const CreateForm = observer(() => {
  const { mode, closeModal } = useProductPage();
  const { form, handleSubmit, loading, reset, response } = useCreateProduct();
  const { enqueueSnackbar } = useSnackbar();
  const [, { resetQuery }] = usePaginatorContext();

  useEffect(() => {
    if (response) {
      enqueueSnackbar("Produk baru berhasil ditambahkan");
      closeModal();
      resetQuery();
    }
  }, [response]);

  useEffect(() => {
    if (mode === null || mode === "create") {
      reset();
    }
  }, [mode]);

  return (
    <Dialog fullWidth open={mode === "create"} onClose={closeModal}>
      <DialogContent>
        <Typography sx={{ mb: 2, fontWeight: "bolder" }} variant="h5">
          Tambah produk
        </Typography>
        <FormProvider {...form}>
          <Fields />
          <Box sx={{ mt: 2 }}>
            {mode === "create" ? <UploadField form={form} /> : null}
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
