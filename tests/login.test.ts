// auth.test.ts

import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { loginUser, LOGIN_SUCCESS, LOGIN_FAILURE } from '../src/actions/authActions';

jest.mock('axios'); // Mock axios module

describe('loginUser', () => {
  let dispatch: jest.Mocked<Dispatch<any>>; // Correctly typing dispatch as jest.Mocked<Dispatch<any>>

  beforeEach(() => {
    dispatch = jest.fn(); // Initialize dispatch as a Jest mock function
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches LOGIN_SUCCESS on successful login', async () => {
    const mockResponse = {
      status: 200,
      data: {
        token: 'mockToken',
        user: {
          _id: 'mockUserId',
        },
      },
    };

    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    await loginUser({ email: 'test@example.com', password: 'password' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: LOGIN_SUCCESS,
      payload: mockResponse.data,
    });
  });

  it('dispatches LOGIN_FAILURE on unexpected response status', async () => {
    const mockResponse = {
      status: 500,
      data: {},
    };

    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    try {
      await loginUser({ email: 'test@example.com', password: 'password' })(dispatch);
    } catch (error) {
      expect(dispatch).toHaveBeenCalledWith({
        type: LOGIN_FAILURE,
        payload: {
          message: 'Unexpected response status',
          status: mockResponse.status,
          data: mockResponse.data,
        },
      });
    }
  });

  it('dispatches LOGIN_FAILURE on network error', async () => {
    const errorMessage = 'Network Error';
    const error: AxiosError = {
      name: 'AxiosError',
      message: errorMessage,
      config: {
        headers: {  // Correctly defining headers as AxiosRequestHeaders
          'Content-Type': 'application/json',
          // Add other headers if needed, or use Headers instance
        } as any,  // Use 'as any' to satisfy TypeScript type checking
      },
      isAxiosError: true,
      toJSON: () => ({ message: errorMessage }), // Optional: Adjust toJSON as needed
      // Other necessary properties as per AxiosError type
    };

    (axios.post as jest.Mock).mockRejectedValue(error);

    try {
      await loginUser({ email: 'test@example.com', password: 'password' })(dispatch);
    } catch (error) {
      expect(dispatch).toHaveBeenCalledWith({
        type: LOGIN_FAILURE,
        payload: {
          message: 'Error setting up the request. Please check your network connection.',
        },
      });
    }
  });
});
