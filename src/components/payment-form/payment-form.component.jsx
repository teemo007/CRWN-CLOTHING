import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./payment-form.styles";
import { BUTTON_TYPES_CLASSES } from "../button/button.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { paymentStart } from "../../store/payment/payment.action";
import { selectPaymentIsProcessingPayment } from "../../store/payment/payment.selector";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const amount = useSelector(selectCartTotal);
  const isProcessingPayment = useSelector(selectPaymentIsProcessingPayment);

  const paymentHandler = (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    dispatch(paymentStart({ amount, stripe, elements }));
  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPES_CLASSES.inverted}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
