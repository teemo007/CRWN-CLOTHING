import Home from "./routes/home/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navigation from "./routes/navigation/Navigation.jsx";
import Authentication from "./routes/authentication/Authentication.jsx";
import Shop from "./routes/shop/Shop.jsx";
import CheckOut from "./routes/checkout/checkout.component.jsx";

import {
  createUserDocumentFromAuth,
  getCurrentUser,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils.js";

import { checkUserSession } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession())
  }, []);

  const router = createBrowserRouter([
    {
      element: (
        <>
          <Navigation />
          <Outlet />
        </>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "auth", element: <Authentication /> },
        { path: "shop/*", element: <Shop /> },
        { path: "checkout", element: <CheckOut /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
