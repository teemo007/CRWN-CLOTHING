import { useContext, useState } from "react";
import "./SignUp.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/FormInput";
import Button from "../button/button.component";

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      
      await createUserDocumentFromAuth(user, { displayName });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log(error.message);
      }
    }

    setFormFields(defaultFormFields);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Dont't have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form action="." onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          inputOptions={{
            type: "text",
            id: "Display Name",
            name: "displayName",
            required: true,
            onChange: handleChange,
            value: displayName,
          }}
        />

        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            name: "email",
            id: "Email",
            required: true,
            onChange: handleChange,
            value: email,
          }}
        />

        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            name: "password",
            id: "Password",
            required: true,
            onChange: handleChange,
            value: password,
          }}
        />

        <FormInput
          label="Confirm Password"
          inputOptions={{
            type: "password",
            name: "confirmPassword",
            id: "Confirm Password",
            required: true,
            onChange: handleChange,
            value: confirmPassword,
          }}
        />
        <Button >SIGN UP</Button>
      </form>
    </div>
  );
};

export default SignUp;
