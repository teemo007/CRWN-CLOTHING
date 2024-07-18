import { takeLatest, all, call, put, select } from "redux-saga/effects";
import { PAYMENT_ACTION_TYPE } from "./payment.types";
import { paymentFailed, paymentSuccess } from "./payment.action";
import {  CardElement } from "@stripe/react-stripe-js";
import { selectCurrentUser } from "../user/user.selector";

export function* processPayment({ payload: { amount, stripe, elements } }) {
  try {
    const response = yield call(
      fetch,
      "/.netlify/functions/create-payment-intent",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount * 100 }), //100$ = 0.01$
      }
    );

    const {
      paymentIntent: { client_secret },
    } = yield call([response, "json"]);

    const currentUser = yield select(selectCurrentUser);

    const cardElement = elements.getElement(CardElement)

    const paymentResult = yield call(
      [stripe, "confirmCardPayment"],
      client_secret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: currentUser ? currentUser.displayName : "Guest",
          },
        },
      }
    );

    if (paymentResult.error) {
      alert(paymentResult.error.code || "Payment Error! Please Retry.");
      yield put(paymentFailed(paymentResult.error));
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        yield put(paymentSuccess());
        alert("Payment Succeeded!");
        cardElement.destroy()

      }
    }
  } catch (error) {
    yield put(paymentFailed(error.message));
  }
}

export function* onProcessPayment() {
  yield takeLatest(PAYMENT_ACTION_TYPE.PAYMENT_START, processPayment);
}

export function* paymentSaga() {
  yield all([call(onProcessPayment)]);
}
