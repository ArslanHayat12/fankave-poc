import { createContext } from "react";

export const initialState = {};

export const ThemeConfigContext = createContext({
  state: { ...initialState },
  dispatch: () => undefined,
});
