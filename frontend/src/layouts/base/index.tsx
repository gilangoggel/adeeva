import * as React from "react";
import { Header } from "./header";

export const Base = ({ children }: any) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};
