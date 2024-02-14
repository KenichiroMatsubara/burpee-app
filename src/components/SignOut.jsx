import React from 'react'
import { auth } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/userReducer';
import { IoIosClose } from 'react-icons/io';
import { setOnLogOut } from '../features/dataReducer';
import { CiLogout } from "react-icons/ci";

export const SignOut = () => {

    const usedispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const signOut = () => {
        auth.signOut();
        usedispatch(logout());
    }
    return (
        <div className='
            top-10 right-5 text-center
            absolute ml-auto mr-5
            bg-white border border-gray-600
        '>
            <IoIosClose
                className="
                text-white bg-red-700
                ml-auto mr-0
                h-6 w-8
                cursor-pointer hover:bg-red-500 duration-500
                "
                onClick={() => usedispatch(setOnLogOut(false))}
            />
            <div
                onClick={() => auth.signOut()}
                className='p-2 m-5 rounded-2xl w-20 text-center
                text-white bg-red-600 hover:bg-red-500 cursor-pointer duration-300'
            >
                <CiLogout className='mx-auto text-3xl' />
                <p className='text-sm'>ログアウト</p>
            </div>
            <img src={user.photoURL} className='mx-auto rounded-full m-2 w-10' />
            <p className='mb-2'>{user.displayName}</p>
            
        </div>
    )
}