import { CreateForm } from "./create-form";
import { Box } from "@mui/material";
import { SearchField } from "./search-field";
import { usePaginator, PaginatorContext } from "../../../hooks/use-paginator";
import { observer } from "mobx-react";
import { ProductTable } from "./product-table";
import { Provider } from "./provider";
import { UpdateForm } from "./modals/update-form";
import { Detail } from "./modals/detail";
import { DeleteDialog } from "./modals/delete-dialog";
import { CreateForm as CreateFormDialog } from "./modals/create-form";

export const Product = observer(() => {
  const paginator = usePaginator({ path: "product" });
  return (
    <Provider>
      <PaginatorContext.Provider value={paginator}>
        <UpdateForm />
        <Detail />
        <DeleteDialog />
        <CreateFormDialog />
        <Box sx={{ p: 2 }}>
          <CreateForm />
          <SearchField />
          <ProductTable />
        </Box>
      </PaginatorContext.Provider>
    </Provider>
  );
});
