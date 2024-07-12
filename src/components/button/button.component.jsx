import {
  BaseButton,
  GoogleSignButton,
  InvertedButton,
  UpdateButton,
  ButtonSpinner,
} from "./button.styles.jsx";

export const BUTTON_TYPES_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
  update: "update",
};

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base) =>
  ({
    [BUTTON_TYPES_CLASSES.base]: BaseButton,
    [BUTTON_TYPES_CLASSES.google]: GoogleSignButton,
    [BUTTON_TYPES_CLASSES.inverted]: InvertedButton,
    [BUTTON_TYPES_CLASSES.update]: UpdateButton,
  }[buttonType]);

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
