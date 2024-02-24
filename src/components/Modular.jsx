import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOnAddModular, setOnDataModular, setOnModular } from '../features/dataReducer';
import { IoIosClose } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { LuPenSquare } from "react-icons/lu";


const Modular = (props) => {
    const { year, month } = props;
    const usedispatch = useDispatch();

    const onDataModular = useSelector((state) => state.data.onDataModular)
    const onAddModular = useSelector((state) => state.data.onAddModular)
    const dayIndex = useSelector((state) => state.data.dayIndex)

    const closeModular = () => {
        usedispatch(setOnModular(false));
    }

    const pushAdd = () => {
        if(onDataModular==true || onAddModular==true) return;
        usedispatch(setOnAddModular(true));
    }

    const pushDeleteMemo = () => {
        if(onDataModular==true || onAddModular==true) return;
        usedispatch(setOnDataModular(true));
    }

    return (
        <div
            className=' mr-auto ml-auto
                text-center
                border border-gray-800 bg-white
                w-48 pb-2
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
                    onClick={() => closeModular()}
                />
            </div>
            {year}年{month}月{dayIndex}日
            <div className='flex p-2'>
                <div className='rounded-xl cursor-pointer hover:bg-gray-200
                    flex flex-col
                    '
                    onClick={() => pushAdd()}
                >
                    <IoIosAdd
                        className='
                        p-3
                        h-20 w-20
                        '
                    />
                    <p className='text-xs'>追加</p>
                </div>

                <div className='rounded-xl cursor-pointer hover:bg-gray-200
                    flex flex-col
                    '
                    onClick={() => pushDeleteMemo()}
                >
                    <MdDelete
                        className='
                        p-2
                        h-20 w-20
                        '
                    />
                    <p className='text-xs'>削除</p>
                </div>

                {/* <div className='rounded-xl cursor-pointer hover:bg-gray-200
                    flex flex-col
                    '
                    onClick={() => pushDeleteMemo()}
                >
                    <LuPenSquare
                        className='
                        p-3 h-20 w-20
                        '
                    />
                    <p className='text-xs'>メモ</p>
                </div> */}
            </div>
        </div>
    )
}

export default Modular