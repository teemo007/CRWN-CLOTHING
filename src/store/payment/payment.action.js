import { createAction } from "@reduxjs/toolkit";
import { CHECKOUT_ACTION_TYPE } from "./payment.types";

export const checkoutStart = (amount) =>
  createAction(CHECKOUT_ACTION_TYPE.CHECKOUT_START,amount);
export const checkoutSuccess = () =>
  createAction(CHECKOUT_ACTION_TYPE.CHECKOUT_SUCCESS);
export const checkoutFailed = (error) =>
  createAction(CHECKOUT_ACTION_TYPE.CHECKOUT_FAILED, error);
