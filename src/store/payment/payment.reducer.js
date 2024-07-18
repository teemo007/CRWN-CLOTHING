import { PAYMENT_ACTION_TYPE } from "./payment.types";

const INITIAL_STATE = {
  isProcessingPayment: false,
  error: null,
};

export const paymentReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case PAYMENT_ACTION_TYPE.PAYMENT_START:
      return {
        ...state,
        isProcessingPayment: true,
        error: null,
      };
    case PAYMENT_ACTION_TYPE.PAYMENT_SUCCESS:
      return {
        ...state,
        isProcessingPayment: false,
      };
    case PAYMENT_ACTION_TYPE.PAYMENT_FAILED:
      return {
        ...state,
        isProcessingPayment: false,
        error: payload,
      };

    default:
      return state;
  }
};
