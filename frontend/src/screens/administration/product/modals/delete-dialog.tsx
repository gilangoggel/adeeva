import * as React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import { useProductPage } from "../provider";
import { useApi } from "../../../../hooks/use-api";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { usePaginatorContext } from "../../../../hooks/use-paginator";
import { observer } from "mobx-react";

export const DeleteDialog = observer(() => {
  const { mode, closeModal, entity } = useProductPage();
  const [{ loading, response }, run] = useApi({
    path: `administration/product/${entity ? entity.id : ""}`,
    method: "delete",
  });
  const { enqueueSnackbar } = useSnackbar();
  const [, { resetQuery }] = usePaginatorContext();
  useEffect(() => {
    if (response) {
      resetQuery();
      enqueueSnackbar("Data produk berhasil di hapus");
      closeModal();
    }
  }, [response]);

  return (
    <Dialog open={mode === "delete"} onClose={closeModal}>
      <DialogContent>
        <Typography sx={{ mb: 2 }} variant="h5">
          Konfirmasi
        </Typography>
        <Typography>Apakah anda yakin untuk menghapus produk ?</Typography>
        <Box sx={{ textAlign: "right", mt: 2 }}>
          <Button
            disabled={loading}
            size="small"
            sx={{ mr: 2 }}
            variant="contained"
            color="primary"
            onClick={closeModal}
          >
            Tidak
          </Button>
          <Button
            onClick={() => run({})}
            disabled={loading}
            size="small"
            variant="contained"
            color="error"
          >
            Ya
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
});
