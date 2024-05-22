import {initializeApp} from 'firebase/app'
import { getAuth,signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = JSON.parse( import.meta.env.VITE_firebaseConfig)


import {
    getFirestore,
    doc,
    getDoc,
    setDoc
}  from 'firebase/firestore'

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider)
export const signInWithGoogleRedirect= () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)// database instance, collection, Unique ID


    const userSnapshot = await getDoc(userDocRef)


    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth
        const createAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createAt,
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }
    
    
    return userDocRef
}