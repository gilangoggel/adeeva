import * as React from "react";
import { TextFieldProps, TextField } from "@mui/material";
import { useController } from "react-hook-form";

type Props = Omit<TextFieldProps, "onChange" | "onBlur">;

export const Field = (props: Props & { name: string }) => {
  const {
    field: { onBlur, ref, onChange, value },
    fieldState: { error },
  } = useController({
    name: props.name,
    defaultValue: "",
  });
  console.log("Value : ", value);
  const helperText = error ? error.message : "";
  return (
    <div>
      <TextField
        {...props}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        inputRef={ref}
        helperText={helperText}
        error={Boolean(helperText)}
      />
    </div>
  );
};
