// src/features/dashboard/slices/budgetSummarySlice.ts

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import apiService from "../../../api/apiService";
import API_URLS from "../../../api/apiUrls";
import {BudgetSummary} from "../../../types/budgetSummary";

interface BudgetSummaryState {
    data: BudgetSummary | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: BudgetSummaryState = {
    data: null,
    status: 'idle',
    error: null,
};

export const fetchBudgetSummaryData = createAsyncThunk(
    'category-bookings/summary',
    async ({from, to}: { from: string; to: string }) => {
        const url = API_URLS.BUDGET_SUMMARY.replace('{from}', from).replace('{to}', to);
        const response = await apiService.get<BudgetSummary>(url);
        return response.data;
    }
);

const budgetSummarySlice = createSlice({
    name: 'budgetSummary',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBudgetSummaryData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBudgetSummaryData.fulfilled, (state, action: PayloadAction<BudgetSummary>) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchBudgetSummaryData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

export default budgetSummarySlice.reducer;
