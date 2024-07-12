import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { PaymentFormContainer, FormContainer,PaymentButton } from "./payment-form.styles";
import { BUTTON_TYPES_CLASSES } from "../button/button.component";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal)
  const currentUser = useSelector(selectCurrentUser)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true)


    const {
      paymentIntent: { client_secret },
    } = response;
    console.log(client_secret);

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser? currentUser.displayName : "Guest",
        },
      },
    });

    setIsProcessingPayment(false)

    if(paymentResult.error){
      alert(paymentResult.error)
    }else{
      if(paymentResult.paymentIntent.status === "succeeded"){
        alert("Payment Successed!")
      }
    }

  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPES_CLASSES.inverted}> Pay Now </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
