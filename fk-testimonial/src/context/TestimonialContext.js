import { createContext } from "react";
import { HOME_SCREEN } from "../constants";

export const initialState = {
  type: null,
  url: null,
  status: false,
  screen: HOME_SCREEN,
  stream: null,
  isAudioPlaying: false,
};

export const TestimonialContext = createContext({
  state: { ...initialState },
  dispatch: () => undefined,
});
