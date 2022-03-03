import { Routes as MainRouter, Route } from "react-router-dom";
import { SignIn } from "./screens/sign-in";
import { SignUp } from "./screens/sign-up";
import { NonAuthRoute } from "./components/non-auth-route";
import { RequireAuthRoute } from "./components/require-auth-route";
import { Backoffice } from "./layouts/backoffice";
import { Home } from "./screens/home";
import { Product as AdminProductPage } from "./screens/administration/product";
import { Product } from "./screens/product";
import { Cart as CartPage } from "./screens/cart";

const DefaultPage = (label: string) => {
  const El = () => {
    return (
      <div>
        <h1>Default {label} screen</h1>
      </div>
    );
  };
  return <El />;
};
export const Routes = () => {
  return (
    <MainRouter>
      <Route
        path="/account"
        element={
          <RequireAuthRoute>
            <h1>Account page</h1>
          </RequireAuthRoute>
        }
      />
      <Route
        path="/backoffice"
        element={
          <RequireAuthRoute>
            <Backoffice />
          </RequireAuthRoute>
        }
      >
        <Route path="order" element={DefaultPage("order")} />
        <Route path="delivery" element={DefaultPage("delivery")} />
        <Route path="retur" element={DefaultPage("retur")} />
        <Route path="transaction" element={DefaultPage("transaction")} />
        <Route path="product" element={<AdminProductPage />} />
        <Route path="user" element={DefaultPage("user")} />
        <Route path="reseller" element={DefaultPage("reseller")} />
        <Route path="*" element={<h1>Dashboard page</h1>} />
      </Route>
      <Route
        path="/signin"
        element={
          <NonAuthRoute>
            <SignIn />
          </NonAuthRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <NonAuthRoute>
            <SignUp />
          </NonAuthRoute>
        }
      />
      <Route path="/product/:name" element={<Product />} />
      <Route path="/carts" element={<CartPage />} />
      <Route path="/" element={<Home />} />
    </MainRouter>
  );
};
