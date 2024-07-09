

import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { registerUser, REGISTER_SUCCESS, REGISTER_FAILURE } from '../src/actions/authActions';

jest.mock('axios'); // Mock axios module

describe('registerUser', () => {
  let dispatch: jest.Mocked<Dispatch<any>>;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches REGISTER_SUCCESS on successful registration', async () => {
    const mockResponse = {
      status: 201,
      data: {
        message: 'User registered successfully',
        user: {
          _id: 'mockUserId',
          username: 'testuser',
          email: 'test@example.com',
        },
      },
    };

    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    await registerUser({ username: 'testuser', email: 'test@example.com', password: 'password' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: REGISTER_SUCCESS,
      payload: mockResponse.data,
    });
  });

  it('dispatches REGISTER_FAILURE on unexpected response status', async () => {
    const mockResponse = {
      status: 500,
      data: {},
    };

    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    try {
      await registerUser({ username: 'testuser', email: 'test@example.com', password: 'password' })(dispatch);
    } catch (error) {
      expect(dispatch).toHaveBeenCalledWith({
        type: REGISTER_FAILURE,
        payload: {
          message: 'Unexpected response status',
          status: mockResponse.status,
          data: mockResponse.data,
        },
      });
    }
  });

  it('dispatches REGISTER_FAILURE on network error', async () => {
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
      toJSON: () => ({ message: errorMessage }),
    };

    (axios.post as jest.Mock).mockRejectedValue(error);

    try {
      await registerUser({ username: 'testuser', email: 'test@example.com', password: 'password' })(dispatch);
    } catch (error) {
      expect(dispatch).toHaveBeenCalledWith({
        type: REGISTER_FAILURE,
        payload: {
          message: 'Error setting up the request. Please check your network connection.',
        },
      });
    }
  });
});
