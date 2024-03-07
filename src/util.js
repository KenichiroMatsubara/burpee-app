import dayjs from "dayjs";

export const getMonth = (monthIndex) => {
    const year = dayjs().year();

    const firstDayOfTheMonth = dayjs(new Date(year, monthIndex, 1)).day();
    let currentMonthCount = 0-firstDayOfTheMonth;
    const daysMatrix = new Array(6).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, monthIndex, currentMonthCount));
        });
    });
    return daysMatrix;
}

export const Util = () => {
    return <></>;
}