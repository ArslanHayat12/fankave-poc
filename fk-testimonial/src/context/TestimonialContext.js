import { createContext } from "react";

export const initialState = {
  type: null,
  url: null,
};

export const TestimonialContext = createContext({
  state: { ...initialState },
  dispatch: () => undefined,
});
