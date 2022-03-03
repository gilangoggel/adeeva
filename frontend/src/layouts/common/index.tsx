import * as React from "react";
import { Outlet } from "react-router-dom";

export const Common = () => {
  return (
    <main>
      Common component
      <Outlet />
    </main>
  );
};
