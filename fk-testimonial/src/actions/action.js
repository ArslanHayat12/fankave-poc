export const SET_TYPE = "Set_Type";
export const SET_URL = "Set_Url";
export const SET_STATUS="Set_Status"

export const setTestimonialUrl = (data) => {

  return {
    type: SET_URL,
    payload: { url: data },
  };
};

export const setTestimonialType = (data) => {
    console.log("type in action",data)
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
