import { createContext } from "react";

export const questionInitialState = {
  questionIndex: 0,
};

export const QuestionContext = createContext({
  state: { ...questionInitialState },
  dispatch: () => undefined,
});
