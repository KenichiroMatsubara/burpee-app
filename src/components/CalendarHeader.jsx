import React, { useState } from 'react'
import { SignOut } from './SignOut'
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { setOnLogOut } from '../features/dataReducer';

export const CalendarHeader = () => {
    const onLogOut = useSelector((state) => state.data.onLogOut);
    const usedispatch = useDispatch();
    const onModular = useSelector((state) => state.data.onModular);
    const pushHamburger = () => {
        if(onModular==true) return;
        usedispatch(setOnLogOut(true));
    };
    return (
        <div className='flex items-center'>
            <GiHamburgerMenu
                className='ml-auto mr-2 mt-2'
                onClick={() => pushHamburger()}
            />
            {onLogOut && (
            <>
                <SignOut />
            </>)}
        </div>
    )
}