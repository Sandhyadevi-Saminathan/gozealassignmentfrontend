import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers'; 

// Create and configure the Redux store
const store = configureStore({
    // Combine all reducers into a single root reducer
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', 
});

export default store;
