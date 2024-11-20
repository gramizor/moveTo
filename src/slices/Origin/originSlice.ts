import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { getOrigins } from "../../api/usages";
import { AxiosError } from "axios";

export const loadOrigins = createAsyncThunk<
  { content: Origins[]; totalPages: number },
  { page: number; size: number },
  { rejectValue: string }
>("origins/loadOrigins", async (pagination, { rejectWithValue }) => {
  try {
    const data = await getOrigins(pagination);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
    throw error;
  }
});

export interface Origins {
  id: number;
  origin: string;
}
const originsSlice = createSlice({
  name: "origins",
  initialState: {
    origins: [] as Origins[],
    pagination: { page: 0, size: 10, totalPages: 0 },
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
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
