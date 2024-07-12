import { takeLatest, all, call, put, select } from "redux-saga/effects";
import { PAYMENT_ACTION_TYPE } from "./payment.types";
import { checkoutFailed } from "./payment.action";
import { useStripe,useElements,CardElement } from "@stripe/react-stripe-js";
import { selectCurrentUser } from "../user/user.selector";

export function* processPayment({payload:amount}) {
  const stripe = useStripe();
  const elements = useElements();
  const currentUser = yield select(selectCurrentUser)

  if (!stripe || !elements) {
    return;
  }

  try {
    const response = yield call("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }), //100$ = 0.01$
    })

    const paymentResult = yield call()

  } catch (error) {
    yield put(checkoutFailed(error));
  }
}

export function* paymentSaga() {
  yield takeLatest(PAYMENT_ACTION_TYPE.CHECKOUT_START, processPayment);
}

export function* checkoutSaga() {
  yieldall([all(paymentSaga)]);
}
