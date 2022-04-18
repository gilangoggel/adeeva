import { ProductForm } from '@components/forms/product-form'
import {useFormUtils} from "@hooks/use-form-utils";

export const Create = () => {
  const context = useFormUtils({}, {
    successMessage: "Produk baru berhasil di tambahkan"
  })
  return (
    <ProductForm title='Tambah produk' context={context as any} resolveUrl={()=>`/admin/product`} />
  );
};
