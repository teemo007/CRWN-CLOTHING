import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navigation from "./routes/navigation/Navigation.jsx";
import Authentication from "./routes/authentication/Authentication.jsx";
import { UserProvider } from "./contexts/user.context.jsx";
import { CategoriessProvider } from "./contexts/categories.context.jsx";
import { CartProvider } from "./contexts/cart.context.jsx";
import Shop from "./routes/shop/Shop.jsx";
import CheckOut from "./routes/checkout/checkout.component.jsx";
import CategoriesPreview from "./routes/categories-preview/categories-preview.component.jsx";
import Category from "./routes/category/category.component.jsx";

const router = createBrowserRouter([
  {
    element: (
      <>
        <UserProvider>
          <CategoriessProvider>
            <CartProvider>
              <Navigation />
              <Outlet />
            </CartProvider>
          </CategoriessProvider>
        </UserProvider>
      </>
    ),
    children: [
      { path: "/", element: <App /> },
      { path: "auth", element: <Authentication /> },
      { path: "shop", element: <Shop /> },
      { path:"shop/:category", element: <Category />},
      { path: "checkout", element: <CheckOut /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
