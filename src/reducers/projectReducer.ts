import { Project } from '../actions/interfaces';
import {
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_ERROR,
  FETCH_PROJECTID_SUCCESS,
  FETCH_PROJECTID_ERROR,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_ERROR,
} from '../actions/types';

// Define the interface for the state
interface ProjectState {
  project: Project | null;
  projects: Project[];
  loading: boolean;
  error: string | null;
}

// Initial state for the reducer
const initialState: ProjectState = {
  project: null,
  projects: [],
  loading: false,
  error: null,
};

const projectReducer = (state: ProjectState = initialState, action: any): ProjectState => {
  console.log("action reducer", action);

  switch (action.type) {

    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    case FETCH_PROJECTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
      case FETCH_PROJECTID_SUCCESS:
        return {
          ...state,
          project: action.payload,
          loading: false,
        };
      case FETCH_PROJECTID_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        ),
        loading: false,
      };
    case UPDATE_PROJECT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        loading: false,
      };
    case ADD_PROJECT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default projectReducer;
