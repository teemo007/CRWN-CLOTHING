import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navigation from "./routes/navigation/Navigation.jsx";
import SignIn from "./routes/sign-in/SignIn.jsx";

const router = createBrowserRouter([
  {
    element: (
      <>
        <Navigation />
        <Outlet />
      </>
    ),
    children: [
      { path: "/", element: <App /> },
      { path: "/sign-in", element: <SignIn /> },
  ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
