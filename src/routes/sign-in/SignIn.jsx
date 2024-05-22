import { signInWithGooglePopup,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoolgeUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user)
  };
  return (
    <div>
      <button onClick={logGoolgeUser}>
        <h1>Sign in with Google Popup</h1>
      </button>
    </div>
  );
};

export default SignIn;
