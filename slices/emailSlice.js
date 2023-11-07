// auth.js

// Action Types
const SET_EMAIL = "auth/SET_EMAIL";

// Initial State
const initialState = {
  email: "", // Initial state for email
};

// Action Creators
export const setEmail = (email) => {
  return {
    type: SET_EMAIL,
    payload: email,
  };
};

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
