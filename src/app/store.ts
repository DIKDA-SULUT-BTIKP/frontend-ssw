import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/slices/authSlice';
import userReducer from '../features/slices/userSlice';
import studentReducer from '../features/slices/studentSlice';
import dashboardReducer from '../features/slices/dashboardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    student: studentReducer,
    dashboard: dashboardReducer,
  },
});
