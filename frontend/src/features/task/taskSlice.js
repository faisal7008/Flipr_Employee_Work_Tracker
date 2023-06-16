import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as taskService from './taskService';

// Thunk action to create a task
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await taskService.createTask(token, taskData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Thunk action to get all tasks by employee
export const getTasksByEmployee = createAsyncThunk(
  'tasks/getTasksByEmployee',
  async ({employeeId}, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await taskService.getTasksByEmployee(token, employeeId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Thunk action to get a task by ID
export const getTaskById = createAsyncThunk(
  'tasks/getTaskById',
  async (taskId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await taskService.getTaskById(token, taskId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Thunk action to update a task by ID
export const updateTaskById = createAsyncThunk(
  'tasks/updateTaskById',
  async ({ taskId, employeeId, taskData }, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().auth.token;
      const response = await taskService.updateTaskById(token, taskId, taskData);
      dispatch(getTasksByEmployee({employeeId}))
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Thunk action to delete a task by ID
export const deleteTaskById = createAsyncThunk(
  'tasks/deleteTaskById',
  async (taskId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await taskService.deleteTaskById(token, taskId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  tasks: [],
  loading: false,
  message: null,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload.task);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(getTasksByEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasksByEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
      })
      .addCase(getTasksByEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(getTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.loading = false;
        // state.tasks.push(action.payload.task);
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(updateTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskById.fulfilled, (state) => {
        state.loading = false;
        state.message = action.payload.message
      })
      .addCase(updateTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      })
      .addCase(deleteTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      })
      .addCase(deleteTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : action.error.message;
      });
  },
});

export const { clearError } = taskSlice.actions;

export default taskSlice.reducer;
