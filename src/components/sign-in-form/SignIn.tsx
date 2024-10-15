import { SigninContainer } from "./signIn.styles.jsx";
import FormInput from "../form-input/FormInput.js";
import { useState, FormEvent, ChangeEvent } from "react";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component.js";
import { useDispatch } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action.js";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    // await signInWithGooglePopup();
    dispatch(googleSignInStart());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));
      setFormFields(defaultFormFields);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred");
      }
    }
  };

  return (
    <SigninContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          id="signInEmail"
          name="email"
          required
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          id="signInPassword"
          name="password"
          required
          value={password}
          onChange={handleChange}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPES_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign in
          </Button>
        </div>
      </form>
    </SigninContainer>
  );
};

export default SignIn;
