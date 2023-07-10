import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    color: "white",
    header_style: {
      justifyContent: "flex-start",
    },
};

const messageSlice = createSlice({
  name: "companyStyle",
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setStyle: (state, action) => {
        state.header_style = action.payload;
    },
    resetState: () => initialState
  },
});

const { reducer, actions } = messageSlice;

export const { setColor, clearColor, setStyle, clearStyle, resetState } = actions;
export default reducer;