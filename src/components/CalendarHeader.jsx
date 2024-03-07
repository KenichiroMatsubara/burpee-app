import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setMonthIndex, setOnLogOut } from '../features/dataReducer';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { getMonth } from '../util';

export const CalendarHeader = () => {
    const usedispatch = useDispatch();
    const monthIndex = useSelector((state) => state.data.monthIndex);

    const handlePrevMonth = () => {
        usedispatch(setMonthIndex(monthIndex-1));
    }
    const handleNextMonth = () => {
        usedispatch(setMonthIndex(monthIndex+1));
    }
    return (
        <div className='flex items-center'>
            <IoIosArrowBack
                className=' m-1 bg-gray-800 text-white rounded text-xl hover:bg-gray-600 cursor-pointer duration-300'
                onClick={handlePrevMonth}
            />
            <IoIosArrowForward
                className=' m-1 bg-gray-800 text-white rounded text-xl hover:bg-gray-600 cursor-pointer duration-300'
                onClick={handleNextMonth}
            />
            <div className=''>
                {getMonth(monthIndex)[1][1].format("YYYY")}年{Number(getMonth(monthIndex)[1][1].format("MM"))}月
            </div>
        </div>
    )
}