import {useFormUtils} from "@hooks/use-form-utils";
import {omit} from "lodash";
import { ProductForm } from '@components/forms/product-form'

export const Edit = ({entity}: any) => {
  const uri = window.location.pathname.replace("/edit", "")
  const context   = useFormUtils<IProduct>(
    omit(entity, ['created_at', 'updated_at', 'deleted_at', 'id']),
    {method : "put"}
  )
  return (
    <ProductForm context={context} resolveUrl={()=>uri}/>
  );
};
