import { Middleware, isAction } from "redux";
import { RootState } from "../store"; // Adjust the import path as needed

export const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (isAction(action)) {
      console.log("type", action.type);
      console.log(
        "payload",
        "payload" in action ? action.payload : "No payload"
      );
      console.log("currentState: ", store.getState());

      const result = next(action);
      console.log("next State ", store.getState());
      return result;
    }

    // If it's not a valid action, just pass it through
    return next(action);
  };
