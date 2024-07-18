import {configureStore} from '@reduxjs/toolkit';
import accountReducer from '../features/report-graph/slices/accountSlice';
import dateFilterReducer from '../features/report-graph/slices/dateFilterSlice';
import categoryTypeFilterReducer from '../features/report-graph/slices/categoryTypeFilterSlice';

export const store = configureStore({
    reducer: {
        account: accountReducer,
        dateFilter: dateFilterReducer,
        categoryTypeFilter: categoryTypeFilterReducer,
    },
});
