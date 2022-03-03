import { useForm } from "react-hook-form";
import { ZodSchema } from "zod";
import { useApi } from "./use-api";
import { zodResolver } from "@hookform/resolvers/zod";

type Config = {
  path: string;
  method?: "post" | "put";
  schema: ZodSchema<any>;
  withFile?: boolean;
  defaultValues?: Record<string, any>;
};

export function useFormApi({
  path,
  schema,
  method = "post",
  withFile = false,
  defaultValues,
}: Config) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const [{ response, loading }, run, refresh] = useApi({
    method,
    path,
    withFile,
  });
  const handleSubmit = form.handleSubmit(run);
  const reset = () => {
    form.reset({});
    form.clearErrors();
    refresh();
  };
  return {
    response,
    handleSubmit,
    loading,
    form,
    reset,
  };
}
