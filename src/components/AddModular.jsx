import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOnAddModular, setOnModular } from '../features/dataReducer';
import { IoIosClose } from "react-icons/io";


const AddModular = (props) => {
    const { year, month } = props;
    const usedispatch = useDispatch();

    const Hour=[];
    const [burpeeTime,setBurpeeTime] = useState("00:00");
    const [burpeePace,setBurpeePace] = useState("5.0");

    const [runPaceM,setRunPaceM] = useState();
    const [runPaceS,setRunPaceS] = useState();
    const [runLength,setRunLength] = useState();

    const [studyH,setStudyH] = useState();
    const [studyM,setStudyM] = useState();
    const [studySubject,setStudySubject] = useState("");


    const onDataModular = useSelector((state) => state.data.onDataModular)
    const onAddModular = useSelector((state) => state.data.onAddModular)
    const modularNumber = useSelector((state) => state.data.modularNumber)

    const [kind ,setKind] = useState("burpee");

    const kinds=["burpee", "run", "study"];

    const closeAddModular = () => {
        usedispatch(setOnAddModular(false));
    }

    const pushAdd = () => {
    }

    return (
        <div
            className=' mr-auto ml-auto
                text-center
                border border-gray-800 bg-white
                w-60 h-56 pb-2
                flex flex-col
            '
        >
            <div>
                <IoIosClose
                    className="
                    text-white bg-red-700
                    ml-auto mr-0
                    h-6 w-8
                    cursor-pointer hover:bg-red-500 duration-500
                    "
                    onClick={() => closeAddModular()}
                />
            </div>
            {year}年{month}月{modularNumber}日
            <div>
                <select
                    onChange={(e) => setKind(e.target.value)}
                    className='border border-gray-400 rounded p-1'
                >
                    {kinds.map((data,index) => {
                        return <option
                            value={data}
                            >{data}</option>
                    })}
                </select>
                {(kind==="burpee") &&(
                    <div className=''>
                        <div className=''>
                            <label htmlFor='BurpeeTimeInput'>時間(H:S):</label>
                            <input
                                type='time'
                                id="BurpeeTimeInput"
                                value={burpeeTime}
                                className='text-lg border rounded'
                                onChange={(e) => setBurpeeTime(e.target.value)}
                            />
                        </div>

                        <div className='m-2'>
                            <label htmlFor='BurpeePaceInput'>ペース</label>
                            <input
                                type='text'
                                id="BurpeePaceInput"
                                value={burpeePace}
                                className='border rounded w-10 p-1 ml-2 text-center'
                                onChange={(e) => {
                                    if(isNaN(e.target.value)===true && Number(e.target.value)>=2 && Number(e.target.value)<=10) setBurpeePace(e.target.value);
                                    else setBurpeePace("5.0");
                                }}
                            />
                        </div>
                    </div>
                )}
                {(kind==="run") &&(
                    <div>
                        <input
                            onChange={(e) => setRunPaceM(e.target.value)}
                            value={runPaceM}
                            type='number'
                            placeholder='ペース（分）'
                            className='border border-gray-400 rounded p-1'
                        />PM
                        <input
                            onChange={(e) => setRunPaceS(e.target.value)}
                            value={runPaceS}
                            type='number'
                            placeholder='ペース（秒）'
                            className='border border-gray-400 rounded p-1'
                        />PS
                        <label htmlFor='runLengthInput'>距離</label>
                        <input
                            onChange={(e) => setRunLength(e.target.value)}
                            id='runLengthInput'
                            value={runLength}
                            type='number'
                            placeholder='距離'
                            className='border border-gray-400 rounded w-16 p-1'
                        />Km
                    </div>
                )}
                {(kind==="study") &&(
                    <div>
                        <input
                            onChange={(e) => setStudyH(e.target.value)}
                            value={studyH}
                            type='number'
                            placeholder='勉強時間(時)'
                            className='border border-gray-400 rounded p-1'
                        />H
                        <input
                            onChange={(e) => setStudyM(e.target.value)}
                            value={studyM}
                            type='number'
                            placeholder='勉強時間(分)'
                            className='border border-gray-400 rounded p-1'
                        />M
                        <input
                            onChange={(e) => setStudySubject(e.target.value)}
                            value={studySubject}
                            type='text'
                            placeholder='科目'
                            className='border border-gray-400 rounded p-1'
                        />H
                    </div>
                )}
                <button
                    className='p-2 rounded
                    text-white duration-200 bg-blue-600 hover:bg-blue-400'
                >
                    データを追加
                </button>
            </div>
        </div>
    )
}

export default AddModular