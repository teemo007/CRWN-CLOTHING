import SignUp from "../../components/sign-up-form/SignUp";
import SignIn from "../../components/sign-in-form/SignIn";
import "./authentication.styles.scss"

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
    <div className="authentication-container">
      {/* <button onClick={logGoolgeUser}>
        <h1>Sign in with Google Popup</h1>
      </button> */}
      <SignIn className="flex-item-left"/>
      <SignUp className="flex-item-right"/>
    </div>
  );
};

export default Authentication;
