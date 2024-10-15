import { FormEvent, useState, ChangeEvent } from "react";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import { SignupContainer } from "./SignUp.styles";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
import FormInput from "../form-input/FormInput.js";
import Button from "../button/button.component.js";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action.js";

const SignUp = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));
      setFormFields(defaultFormFields);
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user Creation encountered an error", error);
      }
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <SignupContainer>
      <h2>Dont't have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form action="." onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          id="Display Name"
          name="displayName"
          required
          onChange={handleChange}
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          name="email"
          id="Email"
          required
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          id="Password"
          required
          onChange={handleChange}
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          id="Confirm Password"
          required
          onChange={handleChange}
          value={confirmPassword}
        />
        <Button>SIGN UP</Button>
      </form>
    </SignupContainer>
  );
};

export default SignUp;
