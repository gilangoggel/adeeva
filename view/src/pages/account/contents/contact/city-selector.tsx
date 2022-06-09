import { TextField, Autocomplete } from '@mui/material'
import { fieldProps } from './common'
import { cities } from '@root/enums/cities'
import { sortBy } from 'lodash'
import { useFieldState } from "@hooks/use-field-state";
import { useContactForm } from './use-contact-form'
import {useCallback} from "react";

type Options = Record<'label'| 'value', string>

const options = sortBy(cities.map(item => ({
  value: item.city_id,
  label: `${item.type} ${item.city_name}`
})), 'label') as unknown as Options[]

const find = (opt : null | Options) => {
  return !opt ? null : options.find(item => item.value === opt.value);
}

export const CitySelector = () => {
  const [current, changeCallback] = useContactForm();

  const getInitial = useCallback( () => {
    const v = current.cityId.toString();
    return options.find(opt=>opt.value === v)
  },[])

  const [ inputValue, onChange ] = useFieldState<Options>({
    resolveValue: find as any,
    initial: getInitial(),
    onChangeCallback(v: Options) {
      changeCallback('cityId', v.value)
    }
  })
  return (
    <Autocomplete
      value={inputValue}
      onChange={onChange as any}
      renderInput={props=>(
        <TextField
          {...fieldProps as any}
          {...props}
          InputProps={{
            ...props.InputProps,
            disableUnderline: true,
            sx: fieldProps.InputProps.sx
          }}
          label='Kota'
        />
      )}
      options={options}
    />
  );
};
