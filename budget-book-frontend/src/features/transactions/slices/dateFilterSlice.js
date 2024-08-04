import {createSlice} from '@reduxjs/toolkit';
import PeriodEnum from "../../../constants/periodEnum";
import {format, startOfMonth} from 'date-fns';

const dateFilterSlice = createSlice({
    name: 'dateFilter',
    initialState: {
        period: PeriodEnum.MONTH,
        date: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    },
    reducers: {
        setPeriod: (state, action) => {
            state.period = action.payload;
        },
        setDate: (state, action) => {
            state.date = action.payload;
        }
    },
});

export const {setPeriod, setDate} = dateFilterSlice.actions;
export default dateFilterSlice.reducer;