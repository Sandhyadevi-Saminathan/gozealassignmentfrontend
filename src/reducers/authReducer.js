import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/authActions';

const initialState = {
  user: null,
  users:[],
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        users: action.payload, // Assuming response.data has a 'user' property
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload, // Assuming payload contains error message
      };
    default:
      return state;
  }
};

export default authReducer;
