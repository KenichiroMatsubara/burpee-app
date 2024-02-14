import React, { useEffect, useState } from 'react';
import { getMonth } from "../util";
import { CalendarHeader } from "./CalendarHeader";
import { Month } from "./Month";
import { SignIn } from "./SignIn";
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../features/userReducer';

export const Main = () => {
    const [currentMonth, setCurrentMonth] = useState(getMonth());

    const usedispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        auth.onAuthStateChanged((loginUser) => {
            if(loginUser){
                usedispatch(login({
                    uid: loginUser.uid,
                    photoURL: loginUser.photoURL,
                    email: loginUser.email,
                    displayName: loginUser.displayName,
                }));
            }
            else {
                usedispatch(logout());
            }
        });
    },[usedispatch]);

    return (
        <>
        {user ?
        (<div
            className='h-screen flex flex-1 flex-col'
        >
            <CalendarHeader />
            <Month month={getMonth()} />
        </div>)
        :
        (<div className='flex-1'>
            <SignIn />
        </div>)
        }
        </>
    );
}