import { createContext } from "react";

export const initialState = {
  questionIndex:0
};

export const QuestionContext = createContext({
  state: { ...initialState },
  dispatch: () => undefined,
});
