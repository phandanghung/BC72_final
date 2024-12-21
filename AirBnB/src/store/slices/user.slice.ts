import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentUser } from '../../interfaces/user.interface';


interface UserState {
  currentUser: CurrentUser | null;
}

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }: PayloadAction<CurrentUser>) => {
      localStorage.setItem('currentUser', JSON.stringify(payload));
      state.currentUser = payload;
    },
    logout: (state) => {
      localStorage.clear();
      state.currentUser = null;
    },

  },
});

export const { setCurrentUser, logout } = userSlice.actions;
export default userSlice;
