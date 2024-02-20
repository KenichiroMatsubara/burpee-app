import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTraining, setOnDataModular, setOnModular, setTraining } from '../features/dataReducer';
import { IoIosClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const DataList = (props) => {
    const {year,month}=props;

    const modularNumber=useSelector((state) => state.data.modularNumber);
    const training=useSelector((state) => state.data.training);
    const trainingD = training[modularNumber];

    const usedispatch = useDispatch();


    const deleteData = (pos) => {
        const newTraining = [...training];
        newTraining[modularNumber]=[...newTraining[modularNumber]].splice(pos,1);
        usedispatch(setTraining(newTraining));
    }


    return (<>
    {trainingD.length===0 && <><p />データなし</>}
    {trainingD.map((data,index) => {
        if(data.kind==="burpee"){
            return (<div className='border border-gray-400 mx-2 my-1 flex items-center' key={Math.random()}>
                <div className='ml-2'>{data.kind}:　{data.h}H {data.m}M　{data.pace}pace</div>
                <MdDelete
                    className='ml-auto mr-2 cursor-pointer hover:text-gray-500'
                    onClick={(e) => {e.stopPropagation();deleteData(index);}}
                />
            </div>);
        }
        else if(data.kind==="run"){
            return (<div className='border border-gray-400 mx-2 my-1 flex items-center' key={Math.random()}>
                <div className='ml-2'>{data.kind}:　pace {data.paceM}M {data.paceS}S　{data.length}km</div>
                <MdDelete
                    className='ml-auto mr-2 cursor-pointer hover:text-gray-500'
                    onClick={(e) => {e.stopPropagation();deleteData(index);}}
                />
            </div>);
        }
        else if(data.kind==="study"){
            return (<div className='border border-gray-400 mx-2 my-1 flex items-center' key={Math.random()}>
                <div className='ml-2'>{data.kind}:　{data.subject.trim()==="" ? "科目なし":data.subject}　{data.h}H {data.m}M</div>
                <MdDelete
                    className='ml-auto mr-2 cursor-pointer hover:text-gray-500'
                    onClick={(e) => {e.stopPropagation();deleteData(index);}}
                />
            </div>);
        }
    })}
    </>);
}



const DataModular = (props) => {
    const {year,month}=props;
    const usedispatch = useDispatch();

    const modularNumber = useSelector((state) => state.data.modularNumber)
    const trainingD = useSelector((state) => state.data.training[month][modularNumber]);

    const closeDataModular = () => {
        usedispatch(setOnDataModular(false));
    }


    return (
        <div
            className=' mr-auto ml-auto
                text-center
                border border-gray-800 bg-white
                w-80 pb-2
                flex-col
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
                    onClick={() => closeDataModular()}
                />
            </div>
            {year}年{month}月{modularNumber}日
            {/* ここからデータの詳細 */}
            <DataList year={year} month={month} trainingD={trainingD} />
        </div>
    )
}

export default DataModular