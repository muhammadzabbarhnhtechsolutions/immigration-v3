// redux/exampleSlice.ts
import { createSlice,PayloadAction  } from '@reduxjs/toolkit';

interface Event {
  id: string;
  name: string;
  email: string ; // ISO8601 string or Date object
  is_active_subscriber:  boolean;
  is_fighclub_active:  boolean;
  profile?: string | null;
 
}
interface ExampleState {
  profile: Event | null;
}
const initialState: ExampleState = {
  profile: null,
};

const exampleSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
      setProfileData: (state, action: PayloadAction<Event>) => {
          state.profile = action.payload;
      },
      
  },
});

export const {  setProfileData  } = exampleSlice.actions;

export default exampleSlice.reducer;