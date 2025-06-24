import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const initialState = {
    allBus: [],
    isLoading: false,
    isError: false,
    err: null
};

export const fetchBus = createAsyncThunk('bus/fetchBus', async () => {
    const axiosPublic = useAxiosPublic(); // call inside the thunk function
    const res = await axiosPublic.get('/api/bus');
    return res.data;
});

export const allBusSlice = createSlice({
    name: 'allBus',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(fetchBus.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(fetchBus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allBus = action.payload;
        })
        .addCase(fetchBus.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.err = action.error?.message;
        });
    }
});

export default allBusSlice.reducer;
