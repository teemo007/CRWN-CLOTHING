import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Elements } from "@stripe/react-stripe-js";
import { /* options */ stripePromise } from "./utils/stripe/stripe.utils.js";

const options = {
  // passing the client secret obtained from the server
  clientSecret: '{{sk_test_51Pakk7EI22qc4TsuoQiYEOEzBbhSfdWW7eAFyP9CbvzW5XHq9Kcs0mCziO8zzwA6Vo6oZkCloaf68ssNFdlhKpWp00VMNnYVhI}}',
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Elements stripe={stripePromise} options={options}>
        <App />
        </Elements>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
