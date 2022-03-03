import { Api } from "../utilities/api";
import { useEffect, useMemo } from "react";

type Config = {
  path: string;
  method?: Api["method"];
  withFile?: boolean;
};

type Info<T extends Record<string, any> = Record<string, any>> = {
  response: null | T;
  loading: boolean;
  error: any | null;
};

type UseApi<T> = [Info<T>, (payload?: Record<string, any>) => void, () => void];

export function useApi<T extends Record<string, any> = Record<string, any>>({
  path,
  method = "get",
  withFile = false,
}: Config): UseApi<T> {
  const api = useMemo(() => {
    const instance = new Api<T>(path, method);
    if (withFile) {
      instance.enableFile();
    }
    console.log("With file : ", instance.withFile);
    return instance;
  }, [path, method, withFile]);
  useEffect(() => {
    if (withFile) {
      api.enableFile();
    }
  }, [withFile]);
  useEffect(() => {
    api.updateUri(path);
  }, [path]);
  return [
    {
      loading: api.loading,
      error: api.error,
      response: api.response,
    },
    api.dispatch,
    api.reset,
  ];
}
