import * as React from "react";
import { TextFieldProps, TextField, InputAdornment } from "@mui/material";
import { useController } from "react-hook-form";
import { moneyFormat } from "../../utilities/money-format";
import voca from "voca";
import { KeyboardEventHandler } from "react";

type Props = Omit<TextFieldProps, "onChange" | "onBlur">;

const PATTERN = /^[0-9]+([\.,][0-9]+)?$/;
const allowedKeys = [`delete`, `arrow`, `backspace`, `,`, `.`, `tab`];
const allowedKeyCheck = (char: string) => {
  const isAllowedKey = allowedKeys.find((item) => {
    return char.toLocaleUpperCase().includes(item.toLocaleUpperCase());
  });
  return Boolean(isAllowedKey);
};

const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
  const { key } = event;
  const elValue = (event.target as any).value as string;
  const isNumberPass = PATTERN.test(key);
  if (!elValue && !isNumberPass) {
    event.preventDefault();
    return;
  }
  if (isNumberPass) return;
  const isAllowedKey = allowedKeyCheck(key);
  if (isAllowedKey) return;
  event.preventDefault();
};

export const MoneyField = (props: Props & { name: string }) => {
  const {
    field: { onBlur, ref, onChange, value },
    fieldState: { error },
  } = useController({
    name: props.name,
    defaultValue: 0,
  });
  const helperText = error ? error.message : "";

  const getComponentValue = () => {
    return moneyFormat(value);
  };
  const handleInputChange = (e: any) => {
    const value = e.target.value;
    const parsed = voca(value).replaceAll(",", "").replaceAll(".", "").value();
    const intval = parseInt(parsed);
    onChange(isNaN(intval) ? 0 : intval);
  };

  return (
    <div>
      <TextField
        {...props}
        InputProps={{
          startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
        }}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
        onChange={handleInputChange}
        value={getComponentValue()}
        inputRef={ref}
        helperText={helperText}
        error={Boolean(helperText)}
      />
    </div>
  );
};
