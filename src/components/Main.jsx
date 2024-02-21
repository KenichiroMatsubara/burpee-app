import React, { useEffect, useState } from 'react';
import { getMonth } from "../util";
import { CalendarHeader } from "./CalendarHeader";
import { Month } from "./Month";
import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";
import { auth, db } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../features/userReducer';
import { doc, getDoc,  setDoc, updateDoc } from 'firebase/firestore';
import { setOnLogOut, setTraining } from '../features/dataReducer';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Graph } from './Graph';

export const Main = () => {
    const [mode,setMode] = useState("calendar");

    const MonthStr = ["","Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];

    const usedispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const training = useSelector((state) => state.data.training)
    const monthIndex = useSelector((state) => state.data.monthIndex);
    const onLogOut = useSelector((state) => state.data.onLogOut);
    const onModular = useSelector((state) => state.data.onModular);


    const pushHamburger = () => {
        if(onModular==true) return;
        usedispatch(setOnLogOut(true));
    };

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

    // データ取得のための関数
    const getDataM = async (m) => {
        if(user===null || user.uid===undefined) return;
        const docSnap = await getDoc(doc(db, "trainingData",user.uid));
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const trainingDataM = [];
            for(let i=0;i<=31;i++) trainingDataM.push([]);
            docSnap.data()[MonthStr[m]].forEach((data) => {
                trainingDataM[data.date].push(data);
                console.log(data);
            })
            usedispatch(setTraining(trainingDataM));
        } else {
            // docSnap.data() will be undefined in this case
            const startData = {};
            for(let i=1;i<=12;i++){
                startData[MonthStr[i]]=[];
            }
            await setDoc(doc(db,"trainingData",user.uid),startData);
            usedispatch(setTraining(startData));
            console.log("No such document!");
        }
    }
    // データの取得
    useEffect(() => {
        getDataM(Number(getMonth(monthIndex)[1][1].format("MM")))
    },[user,monthIndex]);

    const saveData = async (m) => {
        if(user===null || user.uid===undefined) return;
        const upData = [];
        for(let i=1;i<=31;i++){
            training[i].forEach((data) => {
                upData.push(data);
            })
        }
        const upDateData={};
        upDateData[MonthStr[m]]=upData;
        await updateDoc(doc(db,"trainingData",user.uid),upDateData);
    }

    useEffect(() => {
        saveData(Number(getMonth(monthIndex)[1][1].format("MM")));
    },[training]);

    return (
        <>
        {user ?
        (<div
            className='h-screen flex flex-1 flex-col'
        >
            <div>
                <button
                    onClick={() => setMode("calendar")}
                    className='m-2 p-2 bg-gray-800 text-white rounded hover:bg-gray-600'
                >
                    カレンダー
                </button>
                <button
                    onClick={() => setMode("graph")}
                    className='mt-2 p-2 bg-gray-800 text-white rounded hover:bg-gray-600'
                >
                    グラフ
                </button>
            </div>


            <GiHamburgerMenu
                className='absolute top-0 right-0 m-2 text-3xl'
                onClick={() => pushHamburger()}
            />
            {onLogOut && (
            <>
                <SignOut />
            </>)}

            {mode==="calendar" &&
            <>
                <CalendarHeader />
                <Month month={getMonth(monthIndex)} />
            </>}
            {mode==="graph" &&
            <>
                <Graph />
            </>
            }
        </div>)
        :
        (<div className='flex-1'>
            <SignIn />
        </div>)
        }
        </>
    );
}