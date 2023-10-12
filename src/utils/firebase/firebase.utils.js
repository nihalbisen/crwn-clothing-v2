import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from  'firebase/auth';
import { doc, getFirestore, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyD5a4gWd3vPti-bN_Ifz9jzybdD8Slflg4",
  authDomain: "crwn-clothing-db-8ecb7.firebaseapp.com",
  projectId: "crwn-clothing-db-8ecb7",
  storageBucket: "crwn-clothing-db-8ecb7.appspot.com",
  messagingSenderId: "373018109975",
  appId: "1:373018109975:web:33b4eff5bf070046941452"
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }
}
