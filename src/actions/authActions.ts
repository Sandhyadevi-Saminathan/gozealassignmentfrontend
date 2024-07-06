import axios from 'axios';
import { Dispatch } from 'redux';

const BASE_URL = 'https://gozealassigmentbackend.onrender.com';


// Define action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

interface LoginResponse {
  token: string;
  user: {
    _id: string;
    // Add other user properties here as needed
  };
}

interface RegisterResponse {
  message: string;
  user: {
    _id: string;
    username: string;
    email: string;
    // Add other user properties here as needed
  };
}

interface LoginError {
  message: string;
  status?: number;
  data?: any;
}

interface RegisterError {
  message: string;
  status?: number;
  data?: any;
}

// Function to log in a user
export const loginUser = (userData: { email: string; password: string }) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const response = await axios.post<LoginResponse>(`${BASE_URL}/login`, userData);

    if (response.status === 200) {
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      return response.data;
    } else {
      const errorPayload: LoginError = {
        message: 'Unexpected response status',
        status: response.status,
        data: response.data,
      };
      dispatch({ type: LOGIN_FAILURE, payload: errorPayload });
      throw new Error('Unexpected response status');
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({ type: LOGIN_FAILURE, payload: { message: errorMessage } });
    throw new Error(errorMessage);
  }
};

// Function to register a new user
export const registerUser = (userData: { username: string; email: string; password: string }) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const response = await axios.post<RegisterResponse>(`${BASE_URL}/register`, userData);

    if (response.status === 201) {
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      return response.data;
    } else {
      const errorPayload: RegisterError = {
        message: 'Unexpected response status',
        status: response.status,
        data: response.data,
      };
      dispatch({ type: REGISTER_FAILURE, payload: errorPayload });
      throw new Error('Unexpected response status');
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    dispatch({ type: REGISTER_FAILURE, payload: { message: errorMessage } });
    throw new Error(errorMessage);
  }
};

function getErrorMessage(error: any): string {
  if (error.response) {
    return error.response.data.message || 'Request failed due to server error.';
  } else if (error.request) {
    return 'No response received from server. Please try again later.';
  } else {
    return 'Error setting up the request. Please check your network connection.';
  }
}
