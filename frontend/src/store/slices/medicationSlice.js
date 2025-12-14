import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { graphqlClient, MEDICATIONS_BY_USER_QUERY } from '../../services/graphqlClient';

export const fetchMedicationsByUser = createAsyncThunk(
  'medications/fetchByUser',
  async (userId, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user?.token;
    const result = await graphqlClient(token).query({
      query: MEDICATIONS_BY_USER_QUERY,
      variables: { userId },
      fetchPolicy: 'no-cache',
    });
    return result.data.medicationsByUser;
  },
);

const medicationSlice = createSlice({
  name: 'medications',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicationsByUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMedicationsByUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMedicationsByUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default medicationSlice.reducer;
