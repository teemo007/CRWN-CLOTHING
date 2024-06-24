import Home from "./routes/home/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navigation from "./routes/navigation/Navigation.jsx";
import Authentication from "./routes/authentication/Authentication.jsx";
import { CartProvider } from "./contexts/cart.context.jsx";
import Shop from "./routes/shop/Shop.jsx";
import CheckOut from "./routes/checkout/checkout.component.jsx";
import Category from "./routes/category/category.component.jsx";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils.js";

import { setCurrentUser } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      element: (
        <>
          <CartProvider>
            <Navigation />
            <Outlet />
          </CartProvider>
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
