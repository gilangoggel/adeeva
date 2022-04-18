import * as React from 'react';
import {UseFormUtils} from "@hooks/use-form-utils";
import {Button} from "@mui/material";
import {InfoField} from "@components/forms/product-form/info-field";
import {PricingFields} from "@components/forms/product-form/pricing-fields";
import {Info} from "@components/forms/product-form/info";
import {ImageField} from "@components/fields/image-field";
import { FormLayout, GroupedField } from '../form-layout'

type Props = {
  context: UseFormUtils<IProduct>
  resolveUrl(): string
  title?: string
};

export class ProductForm extends React.Component<Props, any> {
  render() {
    const { context, title = 'Edit produk', resolveUrl } = this.props;
    return (
      <FormLayout
        title={title}
        backuri='/admin/product'
        backTooltip='Kembali ke data produk'
        context={context}
        resolveUrl={resolveUrl}
      >
        <GroupedField
          title='Informasi produk'
          fields={<InfoField/>}
        />
        <GroupedField
          flex
          title='Harga penjualan'
          fields={<PricingFields/>}
        >
          <Info/>
        </GroupedField>
        <GroupedField
          flex
          title='Foto'
          fields={<ImageField {...context.fieldUtility('image', false) as any}/>}
        >
          <Info type='photo'/>
        </GroupedField>
        <GroupedField
          title=''
          fields={
            <Button variant='contained' className='font-poppins' type='submit' fullWidth>
              Simpan
            </Button>
          }
        />
      </FormLayout>
    );
  };
}
