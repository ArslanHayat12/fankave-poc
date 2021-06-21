import { SET_TYPE, SET_URL,SET_STATUS } from "../actions/action";

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_TYPE:
      return { ...state, ...action.payload };

    case SET_URL:
      return { ...state, ...action.payload };

    case SET_STATUS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
