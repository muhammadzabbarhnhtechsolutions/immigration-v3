// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer/SetAllReducers'; // Import your root reducer here



const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;