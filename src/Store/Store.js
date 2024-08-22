import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getBudget = async() => {
        const response = await axios.get(`${backendUrl}/api/budget/getbudget`);
                return (response?.data);
}
const getExpenses = async() => {
        const response = await axios.get(`${backendUrl}/api/expense/getexpenses`);
                return (response?.data);
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const budgetSlice = createSlice({
    name : 'budgetSlice',
    initialState : {
        budget : null,
        expenses : null,
        selectedBudget : null,
        isBudgetDataFetched : false,
        isBudgetDataFetchedDashboard : false
    },
    reducers : {
        setBudget : (state, action)=>{
            state.budget = action.payload;
        },
        setExpenses : (state, action)=>{
            state.expenses = action.payload;
        },
        setSelectedBudget : (state, action) => {
            state.selectedBudget = action.payload;
        },
        setIsBudgetDataFetched : (state, action) => {
            state.isBudgetDataFetched = action.payload;
        },
        setIsBudgetDataFetchedDashboard : (state, action) => {
            state.isBudgetDataFetchedDashboard = action.payload;
        }
    }
})

const store = configureStore({
    reducer : {
        budgetSlice : budgetSlice.reducer
    }
})


export default store;
export const budgetAction = budgetSlice.actions;
export { getBudget, getExpenses };