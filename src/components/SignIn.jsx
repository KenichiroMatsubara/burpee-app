import React, { useEffect } from 'react'
import { auth, provider } from '../firebase'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { IoIosLogIn } from "react-icons/io";
import { setOnLogOut } from '../features/dataReducer';


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
        });
        usedispatch(setOnLogOut(false));
    }

    return (
        <div
            onClick={() => signIn()}
            className='
            text-center
            w-52 rounded-3xl p-5
            mx-auto mt-10
            cursor-pointer hover:bg-blue-500 duration-500
            bg-blue-700 text-white
            '
        >
            <IoIosLogIn
                className='ml-auto mr-auto text-9xl'
            />
            <p className='text-2xl'>ログイン</p>
        </div>
    )
}
