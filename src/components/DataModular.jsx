import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOnDataModular, setOnModular } from '../features/dataReducer';
import { IoIosClose } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { LuPenSquare } from "react-icons/lu";


const DataModular = () => {
    const usedispatch = useDispatch();

    const onDataModular = useSelector((state) => state.data.onDataModular)
    const onAddModular = useSelector((state) => state.data.onAddModular)
    const modularNumber = useSelector((state) => state.data.modularNumber)

    const closeDataModular = () => {
        usedispatch(setOnDataModular(false));
    }


    return (
        <div
            className=' mr-auto ml-auto
                text-center
                border border-gray-800 bg-white
                w-64 pb-2
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

        </div>
    )
}

export default DataModular