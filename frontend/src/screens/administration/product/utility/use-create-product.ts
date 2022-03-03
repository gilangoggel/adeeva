import { useFormApi } from "../../../../hooks/use-form-api";
import { schema } from "./schema";

export function useCreateProduct() {
  const { form, handleSubmit, loading, reset, response } = useFormApi({
    path: "administration/product",
    schema,
    withFile: true,
  });
  return {
    form,
    loading,
    handleSubmit,
    reset,
    response,
  };
}
