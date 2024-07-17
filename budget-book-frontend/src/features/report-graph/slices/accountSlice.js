import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API_URLS from "../../../api/apiUrls";
import apiService from "../../../api/apiService";

export const fetchAccounts = createAsyncThunk('accounts', async () => {
    const response = await apiService.get(API_URLS.ACCOUNTS);
    return response.data;
});

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        accounts: [],
        selectedAccount: 'all',
        status: 'idle',
        error: null,
    },
    reducers: {
        setAccount: (state, action) => {
            state.selectedAccount = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccounts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.accounts = action.payload;
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const {setAccount} = accountSlice.actions;
export default accountSlice.reducer;