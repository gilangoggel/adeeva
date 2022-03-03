import * as React from "react";
import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import { useController } from "react-hook-form";

type Props = Omit<TextFieldProps, "onChange" | "onBlur">;

export const CategoryField = (props: Props) => {
  const {
    field: { onBlur, ref, onChange, value },
    fieldState: { error },
  } = useController({
    name: "category",
    defaultValue: "__",
  });
  const helperText = error ? error.message : "";
  return (
    <>
      <TextField
        label="Kategori"
        select
        fullWidth
        onChange={onChange}
        onBlur={onBlur}
        size="small"
        value={value}
        helperText={helperText}
        error={Boolean(helperText)}
      >
        <MenuItem value="__" disabled>
          Pilih salah satu opsi
        </MenuItem>
        <MenuItem value="CLOTES">Pakaian</MenuItem>
        <MenuItem value="SKINCARE">Skincare</MenuItem>
        <MenuItem value="FNB">Makanan</MenuItem>
      </TextField>
    </>
  );
};
