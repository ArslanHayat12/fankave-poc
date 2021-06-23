export const SET_TYPE = "Set_Type";
export const SET_URL = "Set_Url";
export const SET_STATUS = "Set_Status";

export const SET_INDEX = "Set_Index";

export const SET_SCREEN = "SET_SCREEN";

export const setTestimonialUrl = (data) => {
  return {
    type: SET_URL,
    payload: { url: data },
  };
};

export const setTestimonialType = (data) => {
  return {
    type: SET_TYPE,
    payload: { type: data },
  };
};

export const setStatus = (data) => {
  return {
    type: SET_STATUS,
    payload: { status: data },
  };
};

export const setQuestionIndex = (data) => {
  return {
    type: SET_INDEX,
    payload: { questionIndex: data },
  };
};

export const setScreen = (data) => {
  return {
    type: SET_SCREEN,
    payload: data,
  };
};
