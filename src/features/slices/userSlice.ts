import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config';

interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: string;
  confirmPassword: string;
  password: string;
}

interface UserState {
  user: User | null;
  users: User[] | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: UserState = {
  user: null,
  users: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createUser = createAsyncThunk<User, User, { rejectValue: string }>(
  'user/createUser',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(`${config.API_URL}/users`, user);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  },
);

export const getAllUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>('user/getAllUsers', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${config.API_URL}/users`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred');
  }
});

export const getUserById = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>('user/getUserById', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${config.API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred');
  }
});

export const updateUser = createAsyncThunk<User, User, { rejectValue: string }>(
  'user/updateUser',
  async (user, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${config.API_URL}/users/${user.id}`,
        user,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  },
);

export const changeStatus = createAsyncThunk<
  User[],
  { id: string; status: string },
  { rejectValue: string }
>('user/changeStatus', async ({ id, status }, thunkAPI) => {
  try {
    await axios.patch(`${config.API_URL}/users/status/${id}`, { id, status });
    const response = await axios.get(`${config.API_URL}/users`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'User successfully created';
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(changeStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
        state.message = 'User status successfully changed';
      })
      .addCase(changeStatus.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;
