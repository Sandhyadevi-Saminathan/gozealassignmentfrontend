

import { combineReducers } from '@reduxjs/toolkit';
import projectReducer from './projectReducer'; 
import authReducer from './authReducer';

const rootReducer = combineReducers({
  projects: projectReducer,
  users:authReducer,
  
});

export default rootReducer;
