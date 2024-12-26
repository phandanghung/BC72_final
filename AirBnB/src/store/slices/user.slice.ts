import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Content} from '../../interfaces/user.interface';


interface UserState {
  currentUser: Content | null;
}

const initialState: UserState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }: PayloadAction<Content>) => {
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
