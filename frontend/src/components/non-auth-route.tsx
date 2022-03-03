import * as React from "react";
import { useAuth } from "../hooks/use-auth";
import { Navigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react";

export const NonAuthRoute = observer(
  ({ children }: React.PropsWithChildren<any>) => {
    const auth = useAuth();
    const location = useLocation();
    if (auth.user) {
      return <Navigate to="/" state={{ from: location }} />;
    }
    return children;
  }
);
