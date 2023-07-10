import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderItems from '../Services/orderItems';
import { setMessage, clearMessage } from "./message";

const initialState = {};
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      return {...state, availableMenus : action.payload};
    }
  },
});

export const saveOrderDetails = createAsyncThunk(
  "orders/saveOrderDetails",
  async (orderedItems, thunkAPI) => {
    try {
      const response = await OrderItems.saveOrderDetails(orderedItems);
      thunkAPI.dispatch(clearMessage());
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);


const { reducer, actions } = orderSlice;

export const { setOrder } = actions;
export default reducer;