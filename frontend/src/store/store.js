import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import medicationReducer from './slices/medicationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    medications: medicationReducer,
  },
});
