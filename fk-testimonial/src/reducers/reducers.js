import {
  RESET_DATA,
  SET_TYPE,
  SET_URL,
  SET_STATUS,
  SET_SCREEN,
  SET_STREAM,
  SET_AUDIO_PLAYING,
  SET_INDEX,
  SET_AUDIO_CTX,
} from "../constants";
import { initialState } from "../context/TestimonialContext";

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_TYPE:
      return { ...state, type: action.payload };

    case SET_URL:
      return { ...state, url: action.payload };

    case SET_STATUS:
      return { ...state, status: action.payload };

    case SET_SCREEN:
      return { ...state, screen: action.payload };

    case SET_STREAM:
      return { ...state, stream: action.payload };

    case SET_AUDIO_PLAYING:
      return { ...state, isAudioPlaying: action.payload };

    case SET_AUDIO_CTX:
      return { ...state, audioCtx: action.payload };

    case RESET_DATA: 
      return { ...initialState }
    
    default:
      return state;
  }
};

export const questionReducer = (state, action) => {
  switch (action.type) {
    case SET_INDEX:
      return { ...state, questionIndex: action.payload };

    default:
      return state;
  }
};
