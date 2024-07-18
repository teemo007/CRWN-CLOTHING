import { createAction } from "../../utils/reducer/reducer.utils";
import { PAYMENT_ACTION_TYPE } from "./payment.types";

export const paymentStart = (paymentData) => {
  return createAction(PAYMENT_ACTION_TYPE.PAYMENT_START, paymentData);
};
export const paymentSuccess = () =>
  createAction(PAYMENT_ACTION_TYPE.PAYMENT_SUCCESS);
export const paymentFailed = (error) =>
  createAction(PAYMENT_ACTION_TYPE.PAYMENT_FAILED, error);
