import axios from 'axios';

import {
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_ERROR,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR,
  ADD_PROJECT 
} from './types';



// Base URL for backend
const BASE_URL = 'https://gozealassigmentbackend.onrender.com';

// Function to fetch all projects
export const fetchUserProjects = (userId) => async dispatch => {
  try {
    // Send a GET request to the projects endpoint
    const response = await axios.get(`${BASE_URL}/project/user-projects/${userId}`);
    console.log(response)
      // Dispatch success action with the response data
      dispatch({ type: FETCH_PROJECTS_SUCCESS, payload: response.data });
  } catch (error) {
     // Dispatch error action with the error payload
     dispatch({ type: FETCH_PROJECTS_ERROR, payload: error });
  }
};



// Function to update a project by ID
export const updateProject = (projectId, projectData) => async dispatch => {
  try {
    // Send a PUT request to update the project
    const response = await axios.put(`${BASE_URL}/project/${projectId}`, projectData);
    console.log(response.data); // Log the response from the server
     // Dispatch success action with the updated project data
    dispatch({ type: UPDATE_PROJECT_SUCCESS, payload: response.data });
  } catch (error) {
    // Dispatch error action with the error payload
    dispatch({ type: UPDATE_PROJECT_ERROR, payload: error });
  }
};

// Function to add a new project

export const addProject = (newProject) => async (dispatch) => {
  try {
   
      const response = await axios.post(`${BASE_URL}/project/projects`, newProject);
      const addedProject = response.data.project;
      dispatch({ type: ADD_PROJECT, payload: addedProject });
  } catch (error) {
      console.error('Error adding project:', error);
  }
};
