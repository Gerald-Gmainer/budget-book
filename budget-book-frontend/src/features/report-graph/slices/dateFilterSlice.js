import {createSlice} from '@reduxjs/toolkit';
import DateFilterEnum from "../../../constants/dateFilterEnum";

const dateFilterSlice = createSlice({
    name: 'dateFilter',
    initialState: {
        selectedDateFilter: DateFilterEnum.ALL,
    },
    reducers: {
        setDateFilter: (state, action) => {
            state.selectedDateFilter = action.payload;
        },
    },
});

export const {setDateFilter} = dateFilterSlice.actions;
export default dateFilterSlice.reducer;