import { useApi } from "./use-api";
import { useEffect } from "react";
import { useAuth } from "./use-auth";
import { toJS } from "mobx";

export function useGetUser(onFetched?: (v: boolean) => void) {
  const [{ response }, run] = useApi({
    path: "auth",
  });
  const auth = useAuth();
  useEffect(() => {
    if (response && "user" in response) {
      if (response.user) {
        auth.setUser(toJS(response.user));
      }
      onFetched && onFetched(true);
    }
  }, [response, onFetched]);
  return run;
}
