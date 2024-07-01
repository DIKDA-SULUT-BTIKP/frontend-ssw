import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, LoginUserArgs } from '../types/authTypes';
import { config } from '../../config';

export const LoginUser = createAsyncThunk<
  User,
  LoginUserArgs,
  { rejectValue: string }
>('user/LoginUser', async (user, thunkAPI) => {
  try {
    const response = await axios.post(`${config.API_URL}/login`, {
      email: user.email,
      password: user.password,
    });
    return response.data as User;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred');
  }
});

export const getMe = createAsyncThunk<User, void, { rejectValue: string }>(
  'user/getMe',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${config.API_URL}/me`);
      return response.data as User;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  },
);

export const LogOut = createAsyncThunk<void, void>('user/LogOut', async () => {
  await axios.delete(`${config.API_URL}/logout`);
});
