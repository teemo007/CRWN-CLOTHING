import { useEffect } from "react";
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";
import { getRedirectResult } from "firebase/auth";

const SignIn = () => {
  
    useEffect(async () => {
    const response = await getRedirectResult(auth);
    console.log("res", response);
  }, []);

  const logGoolgeUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  //   const logGoolgeRedirectUser = async () => {
  //     const { user } = await signInWithGoogleRedirect();
  //     //const userDocRef = await signInWithGoogleRedirect(user)
  //     console.log({ user });
  //   };
  return (
    <div>
      <button onClick={logGoolgeUser}>
        <h1>Sign in with Google Popup</h1>
      </button>
      <button onClick={signInWithGoogleRedirect}>
        <h1>Sign in with Google Redirect</h1>
      </button>
    </div>
  );
};

export default SignIn;
