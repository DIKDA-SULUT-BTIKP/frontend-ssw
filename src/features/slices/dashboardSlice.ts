import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config';

interface Dashboard {
  countStudents: number;
  countFemales: number;
  countMales: number;
}

interface DashboardState {
  dashboard: Dashboard;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: DashboardState = {
  dashboard: {
    countStudents: 0,
    countFemales: 0,
    countMales: 0,
  },
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const getCountStudents = createAsyncThunk<
  Dashboard,
  void,
  { rejectValue: string }
>('dashboard/getCountStudents', async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      `${config.API_URL}/dashboard/count-students`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred');
  }
});

export const getCountByGender = createAsyncThunk<
  Dashboard,
  void,
  { rejectValue: string }
>('dashboard/getCountByGender', async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      `${config.API_URL}/dashboard/count-by-gender`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred');
  }
});

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCountStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dashboard.countStudents = action.payload;
      })
      .addCase(getCountStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || 'An unknown error occurred';
      })
      .addCase(getCountByGender.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCountByGender.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dashboard.countFemales = action.payload.female;
        state.dashboard.countMales = action.payload.male;
      })
      .addCase(getCountByGender.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || 'An unknown error occurred';
      });
  },
});

export default dashboardSlice.reducer;
