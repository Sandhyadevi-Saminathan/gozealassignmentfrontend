import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers'; // Assuming you have a root reducer in './reducers'

const store = configureStore({
  reducer: rootReducer,
  // Optional: Add middleware, devtools setup, etc.
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
