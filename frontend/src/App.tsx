import React, { useEffect } from "react";
import "./App.css";
import { Routes } from "./routes";
import { observer } from "mobx-react";
import { useGetUser } from "./hooks/use-get-user";
import { CartContext, cartStore } from "./stores/cart-store";

const App = observer(() => {
  const [hasFetch, setHasFetch] = React.useState(false);
  const getuser = useGetUser(setHasFetch);
  useEffect(() => {
    getuser();
  }, []);
  if (!hasFetch) {
    return <div>loading</div>;
  }
  return (
    <CartContext.Provider value={cartStore}>
      <Routes />
    </CartContext.Provider>
  );
});

export default App;
