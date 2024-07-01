import {
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_ERROR,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR,
  ADD_PROJECT
  
} from '../actions/types';
  
// Initial state for the reducer
const initialState = {
  project: null,
  projects: [],// List of all projects
  loading: false, // Loading state
  error: null,   // Error state
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload, // Update projects list with fetched data
        loading: false,         // Set loading to false
      };
    case FETCH_PROJECTS_ERROR:
      return {
        ...state,
        error: action.payload,  // Update error state with error message
        loading: false,
      };
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.map(project =>
          project._id === action.payload._id ? action.payload : project
        ),  // Update the specific project with new data
        loading: false,
      };
    case UPDATE_PROJECT_ERROR:
      return {
        ...state,
        error: action.payload,   // Update error state with error message
        loading: false,
      };
      case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],   // Add the new project to the projects list
      }; 
    
    default:
      return state;
  }
};

export default projectReducer;
