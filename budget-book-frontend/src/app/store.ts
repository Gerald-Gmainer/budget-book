import {configureStore} from '@reduxjs/toolkit';
import accountReducer from '../features/transactions/slices/accountSlice';
import dateFilterReducer from '../features/transactions/slices/dateFilterSlice';
import categoryTypeFilterReducer from '../features/transactions/slices/categoryTypeFilterSlice';
import budgetSummaryReducer from '../features/transactions/slices/budgetSummarySlice';

export const store = configureStore({
    reducer: {
        account: accountReducer,
        dateFilter: dateFilterReducer,
        categoryTypeFilter: categoryTypeFilterReducer,
        budgetSummary: budgetSummaryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
