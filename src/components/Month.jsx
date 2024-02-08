import React from 'react';
import { Day } from "./Day";
import { useDispatch, useSelector } from 'react-redux';
import Modular from './Modular';
import DataModular from './DataModular';
import AddModular from './AddModular';

export const Month = (props) => {
    const { month } = props;

    const onModular = useSelector((state) => state.data.onModular);
    const onDataModular = useSelector((state) => state.data.onDataModular)
    const onAddModular = useSelector((state) => state.data.onAddModular)
    const training = useSelector((state) => state.data.training);
    const dispatch = useDispatch();


    const xDay = ["Sum","Mon","Tue","Wed","Thu","Fri","Sat"];

    return (
        <div className='flex-1 pt-3 pr-3'>
            {onModular &&(
                <div className=' absolute top-0 right-0 left-0 bottom-0 m-auto mt-10'>
                    <Modular year={Number(month[1][1].format("YYYY"))} month={Number(month[1][1].format("MM"))} />
                </div>
            )}

            {onDataModular &&(
                <div className=' absolute top-0 right-0 left-0 bottom-0 m-auto mt-8'>
                    <DataModular year={Number(month[1][1].format("YYYY"))} month={Number(month[1][1].format("MM"))} />
                </div>
            )}

            {onAddModular &&(
                <div className=' absolute top-0 right-0 left-0 bottom-0 m-auto mt-6'>
                    <AddModular year={Number(month[1][1].format("YYYY"))} month={Number(month[1][1].format("MM"))} />
                </div>
            )}

            <div className='grid grid-cols-7'>
                {xDay.map((row, i)=> (
                    <React.Fragment key={i}>
                        <p className='border border-gray-200 text-sm bg-gray-800 text-white text-center'>{row}</p>
                    </React.Fragment>
                ))}
            </div>
            <div className='flex-1 grid grid-cols-7 grid-rows-5 h-96'>
                {month.map((row,i) => (
                    <React.Fragment key={i}>
                        {row.map((day,idx) => (
                            <Day
                                day={day}
                                key={idx}
                                rowIdx={i}
                                training={training[Number(day.format("MM"))][Number(day.format("DD"))]}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default Month