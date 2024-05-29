import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navigation from "./routes/navigation/Navigation.jsx";
import Authentication from "./routes/authentication/Authentication.jsx";
import { UserProvider } from "./contexts/user.context.jsx";
import { ShopProvider } from "./contexts/shop.context.jsx";
import Shop from "./routes/shop/Shop.jsx";

const router = createBrowserRouter([
  {
    element: (
      <>
        <UserProvider>
          <ShopProvider>
          <Navigation />
          <Outlet />
          </ShopProvider>
        </UserProvider>
      </>
    ),
    children: [
      { path: "/", element: <App /> },
      { path: "auth", element: <Authentication /> },
      { path: "shop", element: <Shop /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
