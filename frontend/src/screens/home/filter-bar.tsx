import * as React from "react";
import { Box, Button, Grid, MenuItem, Paper, TextField } from "@mui/material";
import { usePaginatorContext } from "../../hooks/use-paginator";
import { useState } from "react";

const sx = {
  p: 2,
  borderRadius: 2,
  top: "-30px",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  width: "50%",
};

export const FilterBar = () => {
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

  const onCommit = (e: any) => {
    e.preventDefault();
    updateQuery(formValues);
  };
  const onReset = () => {
    setFormValues({});
    resetQuery();
  };
  return (
    <>
      <Box sx={{ position: "relative", zIndex: 9 }}>
        <Paper elevation={10} sx={sx}>
          <Grid component="form" onSubmit={onCommit} container spacing={2}>
            <Grid item sm={12} md={4}>
              <TextField
                value={getFieldValue("search", "")}
                onChange={formHandler("search")}
                fullWidth
                size="small"
                label="Kata kunci"
              />
            </Grid>
            <Grid item sm={12} md={4}>
              <TextField
                label="Kategori"
                select
                fullWidth
                onChange={formHandler("category")}
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
            </Grid>
            <Grid
              sx={{ display: "flex", alignItems: "center" }}
              item
              sm={12}
              md={4}
            >
              <Button
                type="submit"
                onClick={onCommit}
                variant="contained"
                fullWidth
              >
                Cari
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};
