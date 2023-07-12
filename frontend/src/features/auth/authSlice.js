import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from './authService';
import { toast } from 'react-toastify';

// Thunk action to register a new user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      // console.log(token);
      const response = await authService.registerUser(token, userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Thunk action to login a user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      // console.log(userData)
      const response = await authService.loginUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Thunk action to get all employees
export const getAllEmployees = createAsyncThunk(
  'auth/getAllEmployees',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await authService.getAllEmployees(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Thunk action to get current user's profile
export const getMe = createAsyncThunk('auth/getMe', async (_, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.token;
    const response = await authService.getMe(token);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk action to update current user's profile
export const updateMe = createAsyncThunk(
  'auth/updateMe',
  async (userData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await authService.updateMe(token, userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Thunk action to get user by ID (Admin)
export const getUserById = createAsyncThunk(
  'auth/getUserById',
  async (userId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await authService.getUserById(token, userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Thunk action to update user by ID (Admin)
export const updateUserById = createAsyncThunk(
  'auth/updateUserById',
  async ({ userId, userData }, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().auth.token;
      const response = await authService.updateUserById(token, userId, userData);
      dispatch(getAllEmployees());
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Thunk action to delete user by ID (Admin)
export const deleteUserById = createAsyncThunk(
  'auth/deleteUserById',
  async (userId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await authService.deleteUserById(token, userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Thunk action to upload profile picture
export const uploadProfilePic = createAsyncThunk(
  'auth/uploadProfilePic',
  async (body, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().auth.token;
      const response = await authService.uploadProfilePic(body, token);
      // dispatch(getMe())
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const userJson = localStorage.getItem('worktrackr_user');
const user = userJson ? JSON.parse(userJson) : null;
const tokenJson = localStorage.getItem('worktrackr_token');
const token = tokenJson ? JSON.parse(tokenJson) : null;

const initialState = {
  user: user || null,
  profile: [],
  employees: [],
  isAuthenticated: !!user,
  token: token || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.employees = null;
      localStorage.removeItem('worktrackr_user');
      localStorage.removeItem('worktrackr_token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload.user);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(getAllEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(updateMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.user;
      })
      .addCase(updateMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(updateUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserById.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter((emp) => emp._id !== action.payload.id);
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(uploadProfilePic.fulfilled, (state, action) => {
        if(action.payload?.user){
          localStorage.setItem('worktrackr_user', JSON.stringify(action.payload?.user))
          state.user = action.payload?.user
        }
      })
  },
});

export const { clearError, logout } = authSlice.actions;

export default authSlice.reducer;
