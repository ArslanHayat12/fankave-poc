import React, { useContext } from "react";

import { createContext } from "react";
import { HOME_SCREEN } from "../constants";

export const initialState = {
  type: null,
  url: null,
  urlDuration: 0,
  status: false,
  screen: HOME_SCREEN,
  isAudioPlaying: false,
  clientName: "",
  clientEmail: "",
  clientCompany: "",
  thumbUrl: null,
  recordedChunks: "",
  currentQuestionIndex: 0,
  questions: [],
};

export const TestimonialContext = createContext({
  state: { ...initialState },
  dispatch: () => undefined,
});
