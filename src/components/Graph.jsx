import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getMonth } from '../util';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const Graph = (props) => {
    const training = useSelector((state) => state.data.training);
    const monthIndex = useSelector((state) => state.data.monthIndex);

    const year=Number(getMonth(monthIndex)[1][1].format("YYYY"));
    const month=Number(getMonth(monthIndex)[1][1].format("MM"));


    const [graphKind,setGraphKind] = useState("burpee");
    const [graphText,setGraphText] = useState("バーピー回数");
    const [graphData,setGraphData] = useState([]);

    const [sumOfBurpee,setSumOfBurpee]=useState(0);
    const [sumOfRun,setSumOfRun]=useState(0);
    const [sumOfStudy,setSumOfStudy]=useState(0);


    useEffect(() => {
        if(graphKind==="burpee") setGraphText("バーピー回数");
        else if(graphKind==="run") setGraphText("走行距離");
        else if(graphKind==="study") setGraphText("勉強時間");

        const date = new Date(year,month,0)
        const lastDayOfMonth = date.getDate();
        const newGraphData = [];
        for(let i=0;i<lastDayOfMonth;i++){
            newGraphData.push(0);
        }
        let newSumOfBurpee=0;
        let newSumOfRun=0;
        let newSumOfStudy=0;
        for(let i=1;i<=31;i++){
            training[i].forEach((data) => {
                if(data.year===year && data.month===month && data.kind===graphKind){
                    if(data.kind==="burpee"){
                        const burpeeTimes = (data.h*60+data.m)*(60/data.pace);
                        newGraphData[data.date-1]=newGraphData[data.date-1]+burpeeTimes;
                        newSumOfBurpee = newSumOfBurpee+burpeeTimes
                    }
                    else if(data.kind==="run"){
                        newGraphData[data.date-1]=newGraphData[data.date-1]+data.length;
                        newSumOfRun = newSumOfRun+data.length;
                    }
                    else if(data.kind==="study"){
                        newGraphData[data.date-1]=newGraphData[data.date-1]+data.h*60+data.m;
                        newSumOfStudy = newSumOfStudy+data.h*60+data.m;
                    }
                }
            })
        }
        setSumOfBurpee(newSumOfBurpee);
        setSumOfRun(newSumOfRun);
        setSumOfStudy(newSumOfStudy);
        setGraphData(newGraphData);
    },[graphKind,training]);
    const options = {
        title: {
            text: graphText,
        },
        series: [{
            type: 'line',
            data: graphData,
        },],
    };

    const chartComponentRef = useRef(null);


    return (
        <div>
            <p className='m-2 text-xl'>統計</p>
            <div>
                <button
                    className='m-2 p-2 bg-gray-800 text-white rounded hover:bg-gray-600'
                    onClick={() => setGraphKind("burpee")}
                >
                    バーピー
                </button>
                <button
                    className='mt-2 p-2 bg-gray-800 text-white rounded hover:bg-gray-600'
                    onClick={() => setGraphKind("run")}
                >
                    ランニング
                </button>
                <button
                    className='m-2 p-2 bg-gray-800 text-white rounded hover:bg-gray-600'
                    onClick={() => setGraphKind("study")}
                >
                    勉強
                </button>
            </div>

            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartComponentRef}
                {...props}
            />
            <div className=' text-xl m-2'>
                {graphKind==="burpee" && <div>月間バーピー回数　：{sumOfBurpee}回</div>}
                {graphKind==="run" && <div>月間走行距離　：{sumOfRun}km</div>}
                {graphKind==="study" && <div>月間勉強時間　：{sumOfStudy}分</div>}
            </div>
        </div>
    )
}