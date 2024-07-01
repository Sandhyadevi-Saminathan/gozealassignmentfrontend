import axios from 'axios';


// Base URL for backend
const BASE_URL = 'https://gozealassigmentbackend.onrender.com';

// Function to register a user
export const registerUser = (userData) => async (dispatch) => {
  try {
    // Send a POST request to the registration endpoint with user data
    const response = await axios.post(`${BASE_URL}/register`,userData);
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
  console.log('Login user data:', userData);
  try {
    // Send a POST request to the login endpoint with user data
    const response = await axios.post(`${BASE_URL}/login`, userData);
    console.log('Login response:', response);

    // Check if the response status is 200 (OK)
    if (response.status === 200) {
      // Dispatch success action with the response data
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
      // Return the response data
      return response.data;
    } else {
      // Handle unexpected status codes
      const errorPayload = {
        message: 'Unexpected response status',
        status: response.status,
        data: response.data,
      };
      dispatch({ type: 'LOGIN_FAILURE', payload: errorPayload });
      console.log('Unexpected login response status:', response);
    }
  } catch (error) {
    // Handle login failure
    const errorPayload = {
      message: error.message,
      status: error.response ? error.response.status : null,
      data: error.response ? error.response.data : null,
    };
    dispatch({ type: 'LOGIN_FAILURE', payload: errorPayload });
    console.log('Error during login:', error);
  }
};
