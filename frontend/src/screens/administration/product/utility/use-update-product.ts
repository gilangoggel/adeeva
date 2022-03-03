import { useFormApi } from "../../../../hooks/use-form-api";
import { schema } from "./schema";
import { useProductPage } from "../provider";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { usePaginatorContext } from "../../../../hooks/use-paginator";

export function useUpdateProduct() {
  const { entity, closeModal } = useProductPage();
  const { form, handleSubmit, loading, reset, response } = useFormApi({
    path: `administration/product/${entity ? entity.id : ""}`,
    schema,
    withFile: true,
    defaultValues: entity ?? {},
  });

  useEffect(() => {
    if (entity) {
      const keys = ["name", "price", "description", "pax", "category"];
      const obj: any = {};
      keys.forEach((k) => {
        obj[k] = entity[k];
      });
      obj.resellerPrice = entity.reseller_price;
      Object.keys(obj).forEach((k) => {
        form.setValue(k, obj[k]);
      });
      form.reset(obj);
    } else {
      form.reset();
    }
  }, [entity]);

  const { enqueueSnackbar } = useSnackbar();
  const [, { resetQuery }] = usePaginatorContext();

  useEffect(() => {
    if (response) {
      enqueueSnackbar("Perubahan berhasil di simpan");
      resetQuery();
      closeModal();
    }
  }, [response]);

  return {
    form,
    loading,
    handleSubmit,
    reset,
    response,
  };
}
