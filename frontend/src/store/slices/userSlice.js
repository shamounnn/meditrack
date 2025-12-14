import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userService } from '../../services/userService';

// Clear storage to force login
localStorage.removeItem('meditrack_token');
localStorage.removeItem('meditrack_user');

const tokenFromStorage = null;
const userFromStorage = null;

export const loginUser = createAsyncThunk('user/login', async (payload) => {
  const result = await userService.loginUser(payload);
  return result;
});

export const registerUser = createAsyncThunk('user/register', async (payload) => {
  const result = await userService.registerUser(payload);
  return result;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: userFromStorage ? JSON.parse(userFromStorage) : null,
    token: tokenFromStorage || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('meditrack_token');
      localStorage.removeItem('meditrack_user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        localStorage.setItem('meditrack_token', action.payload.accessToken);
        localStorage.setItem('meditrack_user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        localStorage.setItem('meditrack_token', action.payload.accessToken);
        localStorage.setItem('meditrack_user', JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
