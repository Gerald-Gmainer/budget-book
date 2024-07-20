import {createSlice} from '@reduxjs/toolkit';
import DateFilterEnum from "../../../constants/dateFilterEnum";
import {endOfMonth, format, startOfMonth} from 'date-fns';

const dateFilterSlice = createSlice({
    name: 'dateFilter',
    initialState: {
        selectedDateFilter: DateFilterEnum.MONTH,
        from: format(startOfMonth(new Date()), 'yyyyMMdd'),
        to: format(endOfMonth(new Date()), 'yyyyMMdd')
    },
    reducers: {
        setDateFilter: (state, action) => {
            state.selectedDateFilter = action.payload;
        },
    },
});

export const {setDateFilter} = dateFilterSlice.actions;
export default dateFilterSlice.reducer;