import { createContext } from "react";

export const initialState = {
  type: null,
  url: null,
  status:false
};

export const TestimonialContext = createContext({
  state: { ...initialState },
  dispatch: () => undefined,
});
