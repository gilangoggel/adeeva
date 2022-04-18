import {useFormUtilProvider} from "@hooks/use-form-utils";
import {TextField} from "@mui/material";
import { CityField } from '@components/fields/city-field'
import {BankOptions} from "@components/fields/bank-options";
import { onKeyDown } from '@components/fields/money-field'
import {AccountNumberField} from "@components/fields/account-number-field";

export const ResellerField = () => {

  const { fieldUtility } = useFormUtilProvider<IReseller>();

  return (
    <>
      <TextField
        {...fieldUtility('address')}
        className='field'
        fullWidth
        label='Alamat'
        variant='filled'
      />
      <CityField
        {...fieldUtility('city_id', false)}
        className='field'
        fullWidth
        label='Kota / Kabupaten'
        variant='filled'
      />
      <BankOptions {...fieldUtility('bank', false)} />
      <AccountNumberField
        {...fieldUtility('bank_account', false)}
        className='field'
        fullWidth
        label='Nomor rekening bank'
        variant='filled'
        onKeyDown={onKeyDown}
      />
    </>
  );
};
