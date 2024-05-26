import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navigation from "./routes/navigation/Navigation.jsx";
import Authentication from "./routes/authentication/Authentication.jsx";
import { UserProvider } from "./contexts/user.context.jsx";

const router = createBrowserRouter([
  {
    element: (
      <>
        <UserProvider>
          <Navigation />
          <Outlet />
        </UserProvider>
      </>
    ),
    children: [
      { path: "/", element: <App /> },
      { path: "/auth", element: <Authentication /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
