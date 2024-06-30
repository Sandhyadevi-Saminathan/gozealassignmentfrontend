
import axios from 'axios';

// Function to register a user
export const registerUser = (userData) => async (dispatch) => {
  try {
    // Send a POST request to the registration endpoint with user data
    const response = await axios.post('http://localhost:8000/register', userData);
     // Dispatch success action with the response data
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
  } catch (error) {
    // Extract serializable error information
    const errorPayload = {
      message: error.message,
      status: error.response ? error.response.status : null,
      data: error.response ? error.response.data : null,
    };
    // Dispatch failure action with the error payload
    dispatch({ type: 'REGISTER_FAILURE', payload: errorPayload });
  }
};

// Function to log in a user
export const loginUser = (userData) => async (dispatch) => {
 
  try {
     // Send a POST request to the login endpoint with user data
    const response = await axios.post('http://localhost:8000/login', userData);
      // Dispatch success action with the response data
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    // Return the response data
    return response.data;
  } catch (error) {
    // Handle login failure
    const errorPayload = {
      message: error.message,
      status: error.response ? error.response.status : null,
      data: error.response ? error.response.data : null,
    };
    dispatch({ type: 'LOGIN_FAILURE', payload: errorPayload });
    console.error('Error during login:', error);
  }
};
