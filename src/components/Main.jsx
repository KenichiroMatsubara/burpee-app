import React, { useState } from 'react';
import { getMonth } from "../util";
import { CalendarHeader } from "./CalendarHeader";
import { Sidebar } from "./Sidebar";
import { Month } from "./Month";

export const Main = () => {
    const [currentMonth, setCurrentMonth] = useState(getMonth());

    return (
        <div
            className='h-screen flex flex-1 flex-col'
        >
            <CalendarHeader />
            <div className='flex flex-1'>
                <Sidebar />
                <Month month={currentMonth} />
            </div>
        </div>
    );
}

