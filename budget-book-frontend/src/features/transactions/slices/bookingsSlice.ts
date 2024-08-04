import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CategoryBooking} from "../../../types";
import apiService from "../../../api/apiService";
import API_URLS from "../../../api/apiUrls";

interface BookingListState {
    data: CategoryBooking[] | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: BookingListState = {
    data: [],
    status: 'idle',
    error: null,
};

export const fetchCategoryBookings = createAsyncThunk('category-bookings/fetchBookingsAndCategories', async ({date}: { date: string }) => {
    const url = API_URLS.CATEGORY_BOOKINGS.replace('{date}', date);
    const response = await apiService.get<CategoryBooking[]>(url);
    return response.data
});

const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoryBookings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategoryBookings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCategoryBookings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Could not fetch data';
            });
    },
});

export default bookingSlice.reducer;

