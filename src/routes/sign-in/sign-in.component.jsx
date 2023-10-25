import { useEffect } from "react";

import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect, createUserEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { getRedirectResult } from "firebase/auth";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";


const SignIn = () => {
  useEffect(async () => {
    const response = await getRedirectResult(auth);
    if(response){
      const userDocRef = await createUserDocumentFromAuth(response.user);
      return userDocRef;
    }
    console.log(response)
  }, [])

  const logGoogleUser = async () => { 
    const { user } = await signInWithGooglePopup();
   const userDocRef = await createUserDocumentFromAuth(user);
  }

  // const logGoogleRedirectUser = async () => { 
  //   const { user } = await signInWithGoogleRedirect();
  //   console.log(user);
  // }

  return(
    <div>
      <h1>Sign in component</h1>
      <button onClick={logGoogleUser}>Sign with Google Popup</button>
      {/* <button onClick={signInWithGoogleRedirect}>Sign with Google Redirect</button> */}
      <SignUpForm/>
    </div>
  )
}
export default SignIn;