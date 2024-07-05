import { useState } from "react";
import {SignupContainer} from "./SignUp.styles.jsx";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
import FormInput from "../form-input/FormInput";
import Button from "../button/button.component";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action.js";




const SignUp = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
    
    dispatch(signUpStart(email,password,displayName))
    

    setFormFields(defaultFormFields);
  };
  const handleChange = (e) => {
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
    </SignupContainer>
  );
};

export default SignUp;
