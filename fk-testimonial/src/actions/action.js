export const SET_TYPE = "Set_Type";
export const SET_URL = "Set_Url";

export const setTestimonialUrl = (data) => {
  console.log("url in action", data);
  console.log('card type',data)
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
