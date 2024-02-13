import React, { useEffect } from 'react'
import { auth, provider } from '../firebase'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useDispatch } from 'react-redux'


export const SignIn = () => {
    const usedispatch = useDispatch();
    useEffect(() => {
        
    },[]);
    const signIn = () => {
        signInWithPopup(auth,provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        })
    }

    return (
        <div>
            <button onClick={() => signIn()}>ログイン</button>
        </div>
    )
}
