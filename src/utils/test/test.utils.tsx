import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { rootReducer } from "../../store/root-reducer";

export const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    store = createStore(rootReducer, preloadedState),
    ...renderoptions
  } = {}
) => {
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return { store, ...render(ui, {wrapper: Wrapper, ...renderoptions})}
};
