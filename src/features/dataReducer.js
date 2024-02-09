import { createSlice } from "@reduxjs/toolkit";
import { trainingData } from "./trainingData";

export const dataSlice = createSlice({
    name: "data",
    initialState: {
        mode: "training",
        onModular: false,
        onAddModular: false,
        onDataModular: false,
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

        addTraining: (state,action) => {
            state.training[action.payload.month][action.payload.date].push(action.payload);
        },
    }
})

export default dataSlice.reducer;
export const {changeMode, setOnModular, setModularNumber, setOnAddModular, setOnDataModular, addTraining} = dataSlice.actions;