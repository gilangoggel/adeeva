import * as React from 'react';
import {useFormUtils} from "@hooks/use-form-utils";
import {ResellerForm} from "@components/forms/reseller-form";

export const Create = () => {
  const context = useFormUtils({}, {
    successMessage: "Reseller berhasil ditambahkan"
  })
  return (
    <ResellerForm
      context={context as any}
      resolveUrl={()=>`/admin/reseller`}
    />
  );
};
