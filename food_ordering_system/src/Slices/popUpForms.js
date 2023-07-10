import { createSlice } from "@reduxjs/toolkit";

const initialState = {isPopup: false, popedForm: ""};

const popUpFormSlice = createSlice({
  name: "popUps",
  initialState,
  reducers: {
    setPopUps: (state, action) => {
      return action.payload;
    },
    clearPopUps: () => {
      return { isPopup: false, popedForm: "" };
    },
  },
});

const { reducer, actions } = popUpFormSlice;

export const { setPopUps, clearPopUps } = actions;
export default reducer;