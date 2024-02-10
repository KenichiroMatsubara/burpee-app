import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTraining, setOnAddModular, setOnModular } from '../features/dataReducer';
import { IoIosClose } from "react-icons/io";


const AddModular = (props) => {
    const { year, month } = props;
    const usedispatch = useDispatch();

    const [burpeeH,setBurpeeH] = useState(0);
    const [burpeeM,setBurpeeM] = useState(0);
    const [burpeePace,setBurpeePace] = useState("5.0");

    const [runPaceM,setRunPaceM] = useState(5);
    const [runPaceS,setRunPaceS] = useState(0);
    const [runLength,setRunLength] = useState(0);

    const [studyH,setStudyH] = useState(0);
    const [studyM,setStudyM] = useState(0);
    const [studySubject,setStudySubject] = useState("");


    const modularNumber = useSelector((state) => state.data.modularNumber)

    const [kind ,setKind] = useState("burpee");
    const kinds=["burpee", "run", "study"];

    const closeAddModular = () => {
        usedispatch(setOnAddModular(false));
    }

    const pushAdd = () => {
        const newData = {};
        newData.year=year;
        newData.month=month;
        newData.date=modularNumber;
        newData.kind=kind;
        if(newData.kind==="burpee"){
            if(burpeeH+burpeeM===0 || isNaN(burpeePace)===true|| Number(burpeePace)<2 || 10<Number(burpeePace)){
                window.alert("入力されている数値は無効です");
                return;
            }
            newData.h=burpeeH;
            newData.m=burpeeM;
            newData.pace=burpeePace;
        }
        else if(newData.kind==="run"){
            if(runPaceM===0 || runLength===0){
                window.alert("入力されている数値は無効です");
                return;
            }
            newData.paceM=runPaceM;
            newData.paceS=runPaceS;
            newData.length=runLength;
        }
        else if(newData.kind==="study"){
            if(studyH+studyM===0){
                //studyH+studyM===0はどっちも正なのでstudyH===0 && stydyM===0と等価
                window.alert("入力されている数値は無効です");
                return;
            }
            newData.h=studyH;
            newData.m=studyM;
            newData.subject=studySubject;
        }
        usedispatch(addTraining(newData));
        closeAddModular();
        return;
    }

    const optionReturn = (max) => {
        const ARRAY = [];
        for(let i=0;i<=max;i++) ARRAY.push(i);
        return (<>
            {ARRAY.map((data) => {
                return <option value={data}>{data}</option>
            })}
        </>)
    }

    return (
        <div
            className=' mr-auto ml-auto
                text-center
                border border-gray-800 bg-white
                w-60 h-72 pb-2
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
                    value={kind}
                >
                    {kinds.map((data,index) => {
                        return <option
                            value={data}
                            >{data}</option>
                    })}
                </select>


                {(kind==="burpee") &&(
                    <div className='m-2'>
                        <div>
                            練習時間 H:S
                            <select
                                onChange={(e) => setBurpeeH(e.target.value)}
                                className='border border-gray-400 rounded ml-2 p-1'
                            >
                                {optionReturn(24)}
                            </select>:
                            <select
                                onChange={(e) => setBurpeeM(e.target.value)}
                                className='border border-gray-400 rounded p-1'
                            >
                                {optionReturn(59)}
                            </select>
                        </div>

                        <div className='m-2'>
                            <label htmlFor='BurpeePaceInput'>ペース</label>
                            <input
                                type='number'
                                id="BurpeePaceInput"
                                value={burpeePace}
                                className='border border-gray-400 rounded w-10 p-1 ml-2 text-center'
                                onChange={(e) => setBurpeePace(e.target.value)}
                            />
                        </div>
                    </div>
                )}
                {(kind==="run") &&(
                    <div>
                        <div className='mt-2'>
                            ペース M:S
                            <select
                                onChange={(e) => setRunPaceM(e.target.value)}
                                className='border border-gray-400 rounded p-1 ml-1'
                                value={runPaceM}
                            >
                                {optionReturn(10)}
                            </select>:
                            <select
                                onChange={(e) => setRunPaceS(e.target.value)}
                                className='border  border-gray-400 rounded p-1'
                                value={runPaceS}
                            >
                                {optionReturn(59)}
                            </select>
                        </div>
                        <label htmlFor='runLengthInput'>距離</label>
                        <input
                            onChange={(e) => setRunLength(e.target.value)}
                            id='runLengthInput'
                            value={runLength}
                            type='number'
                            placeholder='距離'
                            className='border border-gray-400 rounded w-16 p-1 m-2'
                        />Km
                    </div>
                )}
                {(kind==="study") &&(
                    <div>
                        <div className='mt-2'>
                            時間 H:M
                            <select
                                onChange={(e) => setStudyH(e.target.value)}
                                className='border border-gray-400 rounded p-1 ml-1'
                                value={studyH}
                            >
                                {optionReturn(24)}
                            </select>:
                            <select
                                onChange={(e) => setStudyM(e.target.value)}
                                className='border border-gray-400 rounded p-1'
                                value={studyM}
                            >
                                {optionReturn(59)}
                            </select>
                        </div>
                        <input
                            onChange={(e) => setStudySubject(e.target.value)}
                            value={studySubject}
                            type='text'
                            placeholder='科目'
                            className='border border-gray-400 rounded p-1 m-2'
                        />
                    </div>
                )}
                <button
                    className='p-2 rounded
                    text-white duration-200 bg-blue-600 hover:bg-blue-400'
                    onClick={() => pushAdd()}
                >
                    データを追加
                </button>
            </div>
        </div>
    )
}

export default AddModular