import axios from 'axios';

import {
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_ERROR,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR,
  ADD_PROJECT 
} from './types';


// Function to fetch all projects
export const fetchProjects = () => async dispatch => {
  try {
    // Send a GET request to the projects endpoint
    const response = await axios.get('https://gozealassigmentbackend.onrender.com/project');
    console.log(response)
      // Dispatch success action with the response data
    dispatch({ type: FETCH_PROJECTS_SUCCESS, payload: response.data });
  } catch (error) {
     // Dispatch error action with the error payload
    dispatch({ type: FETCH_PROJECTS_ERROR, payload: error });
  }
};

// Function to fetch a single project by ID
export const fetchProject = (projectId) => async dispatch => {
  try {
    // Send a GET request to the specific project endpoint
    const response = await axios.get(`https://gozealassigmentbackend.onrender.com/project/${projectId}`);
    // Dispatch success action with the response data
    dispatch({ type: 'FETCH_PROJECT_SUCCESS', payload: response.data });
  } catch (error) {
    // Dispatch error action with the error payload
    dispatch({ type: FETCH_PROJECTS_ERROR, payload: error });
  }
};

// Function to update a project by ID
export const updateProject = (projectId, projectData) => async dispatch => {
  try {
    // Send a PUT request to update the project
    const response = await axios.put(`https://gozealassigmentbackend.onrender.com/project/${projectId}`, projectData);
    console.log(response.data); // Log the response from the server
     // Dispatch success action with the updated project data
    dispatch({ type: UPDATE_PROJECT_SUCCESS, payload: response.data });
  } catch (error) {
    // Dispatch error action with the error payload
    dispatch({ type: UPDATE_PROJECT_ERROR, payload: error });
  }
};

// Function to add a new project
export const addProject = (newProject) => async dispatch => {
  try {
    // Send a POST request to add a new project
    const response = await axios.post('https://gozealassigmentbackend.onrender.com/project', newProject);
    const addedProject = response.data; 
    console.log(addedProject)
    // Dispatch action to add project to Redux store
    dispatch({ type: ADD_PROJECT, payload: addedProject });
  } catch (error) {
    console.error('Error adding project:', error);
    
  }
};
