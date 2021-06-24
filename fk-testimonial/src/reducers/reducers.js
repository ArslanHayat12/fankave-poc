export const SET_TYPE = "Set_Type";
export const SET_URL = "Set_Url";
export const SET_STATUS = "Set_Status";
export const SET_SCREEN = "SET_SCREEN";
export const SET_STREAM = "SET_STREAM";
export const SET_AUDIO_PLAYING = "SET_AUDIO_PLAYING";

export const SET_INDEX = "Set_INDEX";

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
