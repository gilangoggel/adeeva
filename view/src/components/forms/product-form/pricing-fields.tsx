import {MoneyField} from "@components/fields/money-field";
import {TextField} from "@mui/material";
import {useFormUtilProvider} from "@hooks/use-form-utils";

export const PricingFields = () => {

  const { fieldUtility } = useFormUtilProvider<IProduct>()

  return (
    <>
      <MoneyField
        {...fieldUtility('price', false)}
        className='field'
        label='Harga eceran'
        fullWidth
        variant='filled'
      />
      <MoneyField
        {...fieldUtility('reseller_price', false)}
        className='field'
        label='Harga grosir per item'
        fullWidth
        variant='filled'
      />
      <TextField
        {...fieldUtility('pax')}
        className='field'
        label='Quantitas pembelian grosir'
        fullWidth
        variant='filled'
        type='number'
        inputProps={{
          min: 0
        }}
      />
    </>
  );
};
