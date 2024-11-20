import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrigins } from "../../api/usages";
import { AxiosError } from "axios";
export const loadOrigins = createAsyncThunk("origins/loadOrigins", async (pagination, { rejectWithValue }) => {
    try {
        const data = await getOrigins(pagination);
        return data;
    }
    catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error?.response?.data || "An error occurred");
        }
        throw error;
    }
});
const originsSlice = createSlice({
    name: "origins",
    initialState: {
        origins: [],
        pagination: { page: 0, size: 10, totalPages: 0 },
        loading: false,
        error: null,
    },
    reducers: {
        setPage: (state, action) => {
            state.pagination.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadOrigins.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(loadOrigins.fulfilled, (state, action) => {
            state.loading = false;
            state.origins = action.payload.content;
            state.pagination.totalPages = action.payload.totalPages;
        })
            .addCase(loadOrigins.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Unknown error";
        });
    },
});
export const { setPage } = originsSlice.actions;
export default originsSlice.reducer;
