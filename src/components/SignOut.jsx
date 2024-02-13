import React from 'react'
import { auth } from '../firebase'
import { useDispatch } from 'react-redux'
import { logout } from '../features/userReducer';

export const SignOut = () => {

    const usedispatch = useDispatch();
    const signOut = () => {
        auth.signOut();
        usedispatch(logout());
    }
    return (
        <div>
            <button onClick={() => auth.signOut()}>ログアウト</button>
        </div>
    )
}