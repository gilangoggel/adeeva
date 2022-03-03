import * as React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { usePaginatorContext } from "../../../hooks/use-paginator";

export const SearchField = () => {
  const [, { resetQuery, updateQuery }] = usePaginatorContext();
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const getFieldValue = (name: string, defaultVal: any) => {
    if (formValues[name]) {
      return formValues[name];
    }
    return defaultVal;
  };

  const formHandler = (name: string) => {
    return (e: any) => {
      setFormValues({
        ...formValues,
        [name]: e.target.value,
      });
    };
  };

  const onCommit = () => {
    updateQuery(formValues);
  };
  const onReset = () => {
    setFormValues({});
    resetQuery();
  };

  return (
    <Paper sx={{ p: 1, my: 2, borderRadius: 3 }}>
      <Box sx={{ py: 1, pt: 2, display: "flex" }}>
        <TextField
          value={getFieldValue("search", "")}
          label="Pencarian"
          sx={{ mr: 1 }}
          size="small"
          onChange={formHandler("search")}
        />
        <TextField
          label="Kategori"
          select
          onChange={formHandler("category")}
          sx={{ mr: 1, minWidth: 300 }}
          size="small"
          value={getFieldValue("category", "__")}
        >
          <MenuItem value="__" disabled>
            Pilih salah satu opsi
          </MenuItem>
          <MenuItem value="CLOTES">Pakaian</MenuItem>
          <MenuItem value="SKINCARE">Skincare</MenuItem>
          <MenuItem value="FNB">Makanan</MenuItem>
        </TextField>
      </Box>
      <div>
        <ButtonGroup
          sx={{ "& > button": { textTransform: "none", px: 2 } }}
          variant="contained"
          size="small"
        >
          <Button onClick={onReset}>Reset</Button>
          <Button onClick={onCommit}>Cari</Button>
        </ButtonGroup>
      </div>
    </Paper>
  );
};
