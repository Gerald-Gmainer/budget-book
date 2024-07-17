import {configureStore} from '@reduxjs/toolkit';
import accountReducer from '../features/report-graph/slices/accountSlice';

export const store = configureStore({
    reducer: {
        account: accountReducer,
    },
});
