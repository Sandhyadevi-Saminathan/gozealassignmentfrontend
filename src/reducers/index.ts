

import { combineReducers } from '@reduxjs/toolkit';
import projectReducer from './projectReducer'; 


const rootReducer = combineReducers({
  projects: projectReducer,
  
  
});

export default rootReducer;
