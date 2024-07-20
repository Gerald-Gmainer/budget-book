import {createSlice} from '@reduxjs/toolkit';
import CategoryTypeEnum from "../../../constants/categoryTypeEnum";

const categoryTypeFilterSlice = createSlice({
    name: 'categoryTypeFilter',
    initialState: {
        selectedCategoryTypeFilter: CategoryTypeEnum.OUTCOME,
    },
    reducers: {
        setCategoryTypeFilter: (state, action) => {
            state.selectedCategoryTypeFilter = action.payload;
        },
    },
});

export const {setCategoryTypeFilter} = categoryTypeFilterSlice.actions;
export default categoryTypeFilterSlice.reducer;