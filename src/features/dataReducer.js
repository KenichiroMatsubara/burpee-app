import { createSlice } from "@reduxjs/toolkit";
import { trainingData } from "./trainingData";
import dayjs from "dayjs";

export const dataSlice = createSlice({
    name: "data",
    initialState: {
        mode: "training",
        onModular: false,
        onAddModular: false,
        onDataModular: false,
        onLogOut: false,
        monthIndex: dayjs().month(),
        modularNumber: 0,
        training: trainingData,
    },
    reducers: {
        changeMode: (state, action) => {
            state.mode = action.payload;
        },

        setOnModular: (state, action) => {
            state.onModular=action.payload;
        },
        setModularNumber: (state,action) => {
            state.modularNumber=action.payload;
        },

        setOnAddModular: (state, action) => {
            state.onAddModular = action.payload;
        },
        setOnDataModular: (state, action) => {
            state.onDataModular = action.payload;
        },

        setMonthIndex: (state,action) => {
            state.monthIndex = action.payload;
        },
        setTraining: (state,action) => {
            state.training=action.payload;
        },

        setOnLogOut: (state,action) => {
            state.onLogOut=action.payload;
        },
    }
})

export default dataSlice.reducer;
export const {changeMode, setOnModular, setModularNumber, setOnAddModular, setOnDataModular, setMonthIndex, setTraining,setOnLogOut} = dataSlice.actions;