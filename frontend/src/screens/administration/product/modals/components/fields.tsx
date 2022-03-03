import * as React from "react";
import { Box } from "@mui/material";
import { Field } from "../../../../../components/fields/field";
import { CategoryField } from "../../../../../components/fields/category-field";
import { MoneyField } from "../../../../../components/fields/money-field";

const flexSx = {
  display: "flex",
  justifyContent: "space-between",
  "& > div": { width: "49%" },
};
export const Fields = () => {
  return (
    <>
      <Box sx={flexSx}>
        <div>
          <Field name="name" size="small" label="Nama" fullWidth />
        </div>
        <div>
          <CategoryField />
        </div>
      </Box>
      <Box sx={{ mt: 3, ...flexSx }}>
        <div>
          <MoneyField
            name="price"
            size="small"
            label="Harga customer"
            fullWidth
          />
        </div>
        <div>
          <MoneyField
            name="resellerPrice"
            size="small"
            label="Harga reseller"
            fullWidth
          />
        </div>
      </Box>
      <Field
        sx={{ mt: 2 }}
        name="pax"
        size="small"
        type="number"
        label="Kuantitas per pembelian"
        fullWidth
      />
      <Field
        sx={{ mt: 2 }}
        name="description"
        multiline
        minRows={10}
        size="small"
        label="Deskripsi produk"
        fullWidth
      />
    </>
  );
};
