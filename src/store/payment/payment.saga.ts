import { takeLatest, all, call, put, select,Effect } from "redux-saga/effects";
import { PAYMENT_ACTION_TYPE } from "./payment.types";
import { paymentFailed, paymentSuccess } from "./payment.action";
import {  CardElement } from "@stripe/react-stripe-js";
import { selectCurrentUser } from "../user/user.selector";
import { Stripe, StripeElements, PaymentIntentResult } from '@stripe/stripe-js';

// Define the payload type
interface ProcessPaymentAction {
  type: typeof PAYMENT_ACTION_TYPE.PAYMENT_START;
  payload: {
    amount: number;
    stripe: Stripe | null;
    elements: StripeElements | null;
  };
}

export function* processPayment(action: ProcessPaymentAction): Generator<Effect, void, any> {
  const { amount, stripe, elements } = action.payload;

  try {
    // Ensure elements is not null
    if (!stripe || !elements) {
      throw new Error('Stripe has not been initialized.');
    }

    console.log("Amount is ", amount)


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

    if (!cardElement) {
      throw new Error('Card element not found.');
    }

    const paymentResult: PaymentIntentResult = yield call(
      [stripe, stripe.confirmCardPayment],
      client_secret,
      {
        payment_method: {
          card: cardElement ,
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
    yield put(paymentFailed((error as Error).message));
  }
}

export function* onProcessPayment(): Generator<Effect, void, unknown> {
  yield takeLatest(PAYMENT_ACTION_TYPE.PAYMENT_START as string, processPayment);
}

export function* paymentSaga() {
  yield all([call(onProcessPayment)]);
}
