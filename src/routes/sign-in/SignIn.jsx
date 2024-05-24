import { useEffect } from "react";
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";
import { getRedirectResult } from "firebase/auth";
import SignUp from "../../components/sign-up-form/SignUp";

const SignIn = () => {
  
    useEffect( () => {
      async function getRedirectResult1(auth) {
        const response = await getRedirectResult(auth)
        console.log(response)
        if(response){
          const userDocRef = await createUserDocumentFromAuth(response.user)
        }
        //return response

      }
      getRedirectResult1(auth)
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
      <SignUp />
    </div>
  );
};

export default SignIn;
