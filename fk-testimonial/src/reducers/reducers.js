import {
  RESET_DATA,
  SET_TYPE,
  SET_URL,
  SET_URL_DURATION,
  SET_STATUS,
  SET_SCREEN,
  SET_AUDIO_PLAYING,
  SET_INDEX,
  SET_CLIENT_NAME,
  SET_CLIENT_EMAIL,
  SET_CLIENT_COMPANY,
  SET_THUMB_URL,
  SET_RECORD_CHUKS,
  SET_QUESTION,
  SET_QUESTION_URL,
  SET_QUESTION_THUMB_URL,
} from "../constants";
import { initialState } from "../context/TestimonialContext";

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_TYPE:
      return { ...state, type: action.payload };
    case SET_URL:
      return { ...state, url: action.payload };
    case SET_RECORD_CHUKS:
      return { ...state, recordedChunks: action.payload };
    case SET_URL_DURATION:
      return { ...state, urlDuration: action.payload };

    case SET_STATUS:
      return { ...state, status: action.payload };

    case SET_SCREEN:
      return { ...state, screen: action.payload };

    case SET_AUDIO_PLAYING:
      return { ...state, isAudioPlaying: action.payload };

    case SET_CLIENT_NAME:
      return { ...state, clientName: action.payload };

    case SET_CLIENT_EMAIL:
      return { ...state, clientEmail: action.payload };

    case SET_CLIENT_COMPANY:
      return { ...state, clientCompany: action.payload };

    case SET_THUMB_URL:
      return { ...state, thumbUrl: action.payload };

    case RESET_DATA:
      return { ...initialState };

    case SET_INDEX:
      return {
        ...state,
        currentQuestionIndex: action.payload,
      };

    case SET_QUESTION:
      console.log("SET_QUESTION");
      return {
        ...state,
        questions: action.payload,
      };

    case SET_QUESTION_URL:
      const newArray = [...state.questions];
      newArray[action.payload.currentQuestionIndex].url = action.payload.url;
      newArray[action.payload.currentQuestionIndex].isAnswered =
        action.payload.isAnswered;
      return {
        ...state,
        questions: [...newArray],
      };

    case SET_QUESTION_THUMB_URL:
      const array = [...state.questions];
      array[action.payload.currentQuestionIndex].thumbUrl =
        action.payload.thumbUrl;
      array[action.payload.currentQuestionIndex].urlDuration =
        action.payload.urlDuration;
      return {
        ...state,
        questions: [...array],
      };
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
