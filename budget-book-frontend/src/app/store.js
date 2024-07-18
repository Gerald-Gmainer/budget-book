import {configureStore} from '@reduxjs/toolkit';
import accountReducer from '../features/report-graph/slices/accountSlice';
import dateFilterReducer from '../features/report-graph/slices/dateFilterSlice';

export const store = configureStore({
    reducer: {
        account: accountReducer,
        dateFilter: dateFilterReducer,
    },
});
