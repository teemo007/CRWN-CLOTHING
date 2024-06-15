import SignUp from "../../components/sign-up-form/SignUp";
import SignIn from "../../components/sign-in-form/SignIn";
import { AuthenticationContainer } from "./authentication.styles.jsx";

const Authentication = () => {
  // useEffect(() => {
  //   async function getRedirectResult1(auth) {
  //     const response = await getRedirectResult(auth);
  //     console.log(response);
  //     if (response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //     //return response
  //   }
  //   getRedirectResult1(auth);
  // }, []);

  return (
    <AuthenticationContainer>
      {/* <button onClick={logGoolgeUser}>
        <h1>Sign in with Google Popup</h1>
      </button> */}
      <SignIn />
      <SignUp />
    </AuthenticationContainer>
  );
};

export default Authentication;
