import { useForm } from "react-hook-form";
import { schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "../../hooks/use-api";
import { useEffect, useState } from "react";
import { tokenStorage } from "../../utilities/storage-instances";
import { useGetUser } from "../../hooks/use-get-user";
import { useAuth } from "../../hooks/use-auth";

export function useLoginPage() {
  const form = useForm({
    resolver: zodResolver(schema),
  });
  const [{ response }, run] = useApi({
    path: "auth",
    method: "post",
  });
  const [invalidCred, setInvalidCred] = useState<boolean>(false);
  const getuser = useGetUser();
  const auth = useAuth();
  useEffect(() => {
    console.log(auth.user);
  }, [auth.user]);

  useEffect(() => {
    console.log("Response : ", response);
    if (response && "token" in response) {
      if (response.token) {
        tokenStorage.setdata(response.token);
        getuser();
      }
      setInvalidCred(response.token === null);
    }
  }, [response]);
  const handler = form.handleSubmit(run);
  return {
    invalidCred,
    form,
    handler,
  };
}
