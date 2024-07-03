import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config';

// Interface untuk student
interface Student {
  id: number | null;
  name: string;
  gender: string;
  placeOfBirth: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  email: string;
  lastEducation: string;
  schoolName: string;
  graduationYear: number;
  certificate: string;
  nik: string;
  religion: string;
  trainingLocation: string;
}

// State untuk student
interface StudentState {
  student: Student | null;
  students: Student[] | null;
  status: string | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  totalRows: number;
  totalPage: number;
  page: number;
  limit: number;
}

// Initial state untuk student
const initialState: StudentState = {
  student: null,
  students: null,
  status: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  totalRows: 0,
  totalPage: 0,
  page: 0,
  limit: 10,
};

const API_URL = `${config.API_URL}/students`;

export const createStudent = createAsyncThunk<
  Student,
  Student,
  { rejectValue: string }
>('student/createStudent', async (student, thunkAPI) => {
  try {
    const response = await axios.post(API_URL, student);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred');
  }
});

export const getStudents = createAsyncThunk<
  {
    result: Student[];
    totalRows: number;
    totalPage: number;
    page: number;
    limit: number;
  },
  { page: number; limit: number; search?: string },
  { rejectValue: string }
>(
  'student/getStudents',
  async ({ page = 0, limit = 10, search = '' }, thunkAPI) => {
    try {
      const response = await axios.get(API_URL, {
        params: { page, limit, search },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  },
);

// READ student by ID
export const getStudentById = createAsyncThunk<
  Student,
  string,
  { rejectValue: string }
>('student/getStudentById', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred');
  }
});

export const updateStudent = createAsyncThunk<
  Student,
  { id: string; student: Student },
  { rejectValue: string }
>('student/updateStudent', async ({ id, student }, thunkAPI) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, student);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred');
  }
});

// DELETE student
export const deleteStudent = createAsyncThunk<
  Student,
  string,
  { rejectValue: string }
>('student/deleteStudent', async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred');
  }
});

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling untuk createStudent
      .addCase(createStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStudent.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Berhasil';
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.student = null;
      })
      // Handling untuk getStudents
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.students = action.payload.result;
        state.totalRows = action.payload.totalRows;
        state.totalPage = action.payload.totalPage;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.students = null;
      })
      // Handling untuk getStudentById
      .addCase(getStudentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.student = action.payload;
      })
      .addCase(getStudentById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.student = null;
      })
      // Handling untuk updateStudent
      .addCase(updateStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStudent.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.student = null;
      })
      // Handling untuk deleteStudent
      .addCase(deleteStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.student = action.payload;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.student = null;
      });
  },
});

export default studentSlice.reducer;
