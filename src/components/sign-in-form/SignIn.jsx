import {SigninContainer} from "./signIn.styles.jsx";
import FormInput from "../form-input/FormInput";
import { useContext, useState } from "react";
import Button, {BUTTON_TYPES_CLASSES} from "../button/button.component";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuathWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
//import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  //const {setCurrentUser} = useContext(UserContext)

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInAuathWithEmailAndPassword(email, password);
      //setCurrentUser(user)
      setFormFields(defaultFormFields);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SigninContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            id: "signInEmail",
            name: "email",
            required: true,
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
            required: true,
            value: password,
            onChange: handleChange,
          }}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType={BUTTON_TYPES_CLASSES.google} onClick={signInWithGoogle}>
            Google Sign in
          </Button>
        </div>
      </form>
    </SigninContainer>
  );
};

export default SignIn;
