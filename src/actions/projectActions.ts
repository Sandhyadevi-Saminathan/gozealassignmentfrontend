import axios from 'axios';
import { Dispatch } from 'redux';
import {
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_ERROR,
  FETCH_PROJECTID_SUCCESS,
  FETCH_PROJECTID_ERROR,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_ERROR,
} from './types';
import { Project } from './interfaces'; 

const BASE_URL = 'https://gozealassigmentbackend.onrender.com';


// Function to fetch all projects for a user
export const fetchUserProjects = (userId: string) => async (dispatch: Dispatch<any>) => {
  try {
    const response = await axios.get<Project[]>(`${BASE_URL}/project/user-projects/${userId}`, {
      headers: {
        Authorization: `${window.localStorage.getItem('token')}`
      }
    });

    dispatch({ type: FETCH_PROJECTS_SUCCESS, payload: response.data });
    return response.data;
  } catch (error: any) {
    dispatch({ type: FETCH_PROJECTS_ERROR, payload: error.response?.data?.message || 'Error fetching projects' });
  }
};

// Function to fetch a specific project by ID
export const fetchProject = (projectId: string) => async (dispatch: Dispatch<any>) => {
  try {
    const token = window.localStorage.getItem('token');
    const response = await axios.get<Project>(`${BASE_URL}/project/${projectId}`, {
      headers: {
        Authorization: token ? `${token}` : '',
      },
    });
    console.log("actions",response);
    dispatch({ type: FETCH_PROJECTID_SUCCESS, payload: response.data });
    console.log("before return action",response.data);

    return response.data;
  } catch (error: any) {
    dispatch({ type: FETCH_PROJECTID_ERROR, payload: error.response?.data?.message || 'Error fetching project' });
  }
};

// Function to update a project by ID
export const updateProject = (projectId: string, projectData: Partial<Project>) => async (dispatch: Dispatch<any>) => {
  try {
    const response = await axios.put<Project>(`${BASE_URL}/project/${projectId}`, projectData, {
      headers: {
        Authorization: `${window.localStorage.getItem('token')}`
      }
    });

    dispatch({ type: UPDATE_PROJECT_SUCCESS, payload: response.data });
  } catch (error: any) {
    dispatch({ type: UPDATE_PROJECT_ERROR, payload: error.response?.data?.message || 'Error updating project' });
  }
};

// Function to add a new project
export const addProject = (newProject: Omit<Project, '_id'>) => async (dispatch: Dispatch<any>) => {
  try {
    const response = await axios.post<{ project: Project }>(`${BASE_URL}/project/projects`, newProject, {
      headers: {
        Authorization: `${window.localStorage.getItem('token')}`
      }
    });

    const addedProject = response.data.project;
    dispatch({ type: ADD_PROJECT_SUCCESS, payload: addedProject });
  } catch (error) {
    console.error('Error adding project:', error);
    // Dispatch error action if needed
    dispatch({ type: ADD_PROJECT_ERROR, error });
  }
};
