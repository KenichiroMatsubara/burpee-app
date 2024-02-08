import dayjs from 'dayjs';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setModularNumber, setOnModular } from '../features/dataReducer';
import Modular from './Modular';

export const Day = (props) => {
    const { day, rowIdx, training } = props;
    const dispatch = useDispatch();

    const [onBurpeedMark, setOnBurpeedMark] = useState(false);
    const [onRunMark, setOnRunMark] = useState(false);
    const [onStudiedMark, setOnStudiedMark] = useState(false);

    const [dayTrainingData, setDayTrainingData] = useState([]);

    //モジュラー関係
    const onModular = useSelector((state) => state.data.onModular);

    const getCurrentDayClass = (i) => {
        if(i==1){
            let dayClass = "text-sm p-1 my-1 text-center";
            if(rowIdx===0 && Number(day.format("DD"))>10){
                dayClass+=" text-gray-400";
            }
            else if(rowIdx===4 && Number(day.format("DD"))<=20){
                dayClass+=" text-gray-400";
            }
            if(day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")){
                dayClass+=" text-white w-7 bg-blue-600 rounded-full ml-auto mr-auto";
            }
            return dayClass;
        }
        else if(i==2){
            let dayClass="border border-gray-300 flex flex-col cursor-pointer";
            if(rowIdx===0 && Number(day.format("DD"))>10){
            }
            else if(rowIdx===4 && Number(day.format("DD"))<=20){
            }
            else {
                dayClass+=" hover:bg-gray-100 ";
            }
            return dayClass;
        }
    }

    const getTraining = () => {
        for(let i=0;i<training.length;i++){
            if(training[i]!==Number(day.format("YY"))){
                ;
            }
            else if(training[i].kind=="burpee"){
                setOnBurpeedMark(true);
            }
            else if(training[i].kind=="run"){
                setOnRunMark(true);
            }
            else if(training[i].kind=="study"){
                setOnStudiedMark(true);
            }
        }
    }

    const clickDay = () => {
        if(onModular==true) return;
        else if(rowIdx===0 && Number(day.format("DD")>10)) return;
        else if(rowIdx===4 && Number(day.format("DD"))<=20) return;
        dispatch(setOnModular(true));
        dispatch(setModularNumber(Number(day.format("DD"))));
    }

    return (
        <div
            className={getCurrentDayClass(2)}
            onClick={() => clickDay()}
        >
            <header>
                <p className={getCurrentDayClass(1)}>
                    {Number(day.format("DD"))}
                </p>
            </header>
            <div className={onBurpeedMark ? 'bg-green-600 h-2 border':'h-2'}>
                　
            </div>
            <div className={onRunMark ? 'bg-red-600 h-2 border':'h-2'}>
                　
            </div>
            <div className={onStudiedMark ? 'bg-blue-600 h-2 border':'h-2'}>
                　
            </div>
        </div>
    )
}