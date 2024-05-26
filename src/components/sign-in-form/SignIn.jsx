import "./signIn.styles.scss";
import FormInput from "../form-input/FormInput";
import { useContext, useState } from "react";
import Button from "../button/button.component";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuathWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const {setCurrentUser} = useContext(UserContext)

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInAuathWithEmailAndPassword(email, password);
      setCurrentUser(user)
      setFormFields(defaultFormFields);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            id: "signInEmail",
            name: "email",
            require: "true",
            value: email,
            onChange: handleChange,
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            id: "signInPassword",
            name: "password",
            require: "true",
            value: password,
            onChange: handleChange,
          }}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
