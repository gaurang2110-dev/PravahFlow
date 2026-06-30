import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: (state = {}, _action) => state, // Dummy reducer to prevent store configuration error when empty
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
