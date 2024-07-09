import { PaymentElement } from "@stripe/react-stripe-js";
// import styles from "./payment-form.styles";
import Button,{BUTTON_TYPES_CLASSES} from "../button/button.component";

const PaymentForm = () => {
  return (
    <form>
      <PaymentElement />
      <Button buttonType={BUTTON_TYPES_CLASSES.inverted}> Pay Now </Button>
    </form>
  );
};

export default PaymentForm;
