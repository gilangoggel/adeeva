import * as React from "react";
import { Box, Button, FormHelperText, TextField } from "@mui/material";
import { FormProvider } from "react-hook-form";
import { useLoginPage } from "./utilities";
import { Field } from "../../components/fields/field";
import { observer } from "mobx-react";

export const FormContainer = observer(() => {
  const { handler, form, invalidCred } = useLoginPage();
  console.log("Invalid cred", invalidCred);
  return (
    <FormProvider {...form}>
      <Box sx={{ py: 2 }} component="form" onSubmit={handler}>
        <Field name="email" size="small" label="Alamat email" fullWidth />
        <Field
          name="password"
          size="small"
          label="Password"
          type="password"
          sx={{ mt: 2 }}
          fullWidth
        />
        <Button
          sx={{ mt: 2, borderRadius: 5 }}
          type="submit"
          fullWidth
          variant="contained"
        >
          Login
        </Button>
        <FormHelperText error sx={{ mt: 4, textAlign: "center" }}>
          {invalidCred ? "Kombinasi email & password tidak sesuai" : ""}
        </FormHelperText>
      </Box>
    </FormProvider>
  );
});
