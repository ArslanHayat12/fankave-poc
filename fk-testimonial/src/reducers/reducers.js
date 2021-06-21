import { SET_TYPE, SET_URL } from "../actions/action";

export const reducer = (state, action) => {
  console.log("setting type in reducer", action.type);
  switch (action.type) {
    case SET_TYPE:
      return { ...state, ...action.payload };

    case SET_URL:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
