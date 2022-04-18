import {UseFormUtils} from "@hooks/use-form-utils";
import { FormLayout, GroupedField } from '../form-layout'
import { AccountField } from './account-field'
import { ResellerField } from './reseller-field'
import {Button} from "@mui/material";
import * as React from "react";

type Props = {
  context: UseFormUtils<IReseller>
  resolveUrl(): string
  title?: string
  hideUserForm ?: boolean
};

export const ResellerForm = ({ hideUserForm = false, title = "Tambah pengguna reseller", resolveUrl, context }: Props) => {

  return (
    <FormLayout
      title={title}
      backuri='/admin/reseller'
      backTooltip='Kembali ke data reseller'
      context={context}
      resolveUrl={resolveUrl}
    >
      {
        hideUserForm ? null :
          <GroupedField
            title='Akun'
            fields={<AccountField/>}
          />
      }
      <GroupedField
        title='Informasi reseller'
        fields={<ResellerField/>}
      />
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
