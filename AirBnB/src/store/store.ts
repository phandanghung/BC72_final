import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user.slice';


const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
  },
  devTools: import.meta.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
