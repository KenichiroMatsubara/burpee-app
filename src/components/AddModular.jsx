import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOnAddModular, setOnModular } from '../features/dataReducer';
import { IoIosClose } from "react-icons/io";


const AddModular = (props) => {
    const { year, month } = props;
    const usedispatch = useDispatch();

    const [burpeeH,setBurpeeH] = useState();
    const [burpeeM,setBurpeeM] = useState();
    const [burpeePace,setBurpeePace] = useState();

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
                {(kind=="burpee") &&(
                    <div>
                        <input
                            onChange={(e) => setBurpeeH(e.target.value)}
                            value={burpeeH}
                            type='number'
                            placeholder='バーピー時間（時）'
                            className='border border-gray-400 rounded p-1'
                        />H
                        <input
                            onChange={(e) => setBurpeeM(Math.min(e.target.value,59))}
                            value={burpeeM}
                            type='number'
                            placeholder='バーピー時間（分）'
                            className='border border-gray-400 rounded p-1'
                        />M
                        <input
                            onChange={(e) => setBurpeePace(e.target.value)}
                            value={burpeePace}
                            type='number'
                            placeholder='何秒に1回'
                            className='border border-gray-400 rounded p-1'
                        />P
                    </div>
                )}
                {(kind=="run") &&(
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
                        <input
                            onChange={(e) => setRunLength(e.target.value)}
                            value={runLength}
                            type='number'
                            placeholder='距離'
                            className='border border-gray-400 rounded p-1'
                        />Ln
                    </div>
                )}
                {(kind=="study") &&(
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
            </div>
        </div>
    )
}

export default AddModular