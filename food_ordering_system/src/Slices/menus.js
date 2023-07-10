import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MenuService from '../Services/menuDetails';
import MenuItemsService from '../Services/menuItems';
import { setMessage, clearMessage } from "./message";
import { logout } from "../Slices/auth";

export const createCategory = createAsyncThunk(
  "menus/createCategory",
  async ({ category_name }, thunkAPI) => {
    try {
      const response = await MenuService.addNewCategory(category_name);
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
      // if (error.response && error.response.status === 401) {
      //   thunkAPI.dispatch(logout());
      // }
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {totalItem: 0};
const menuSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    setMenu: (state, action) => {
      return {...state, availableMenus : action.payload};
    },
    setTotalItem:(state, action) => {
      state.totalItem += action.payload;
    },
    setOrderDetails: (state, action) => {
      return {...state, allOrderDetails : action.payload};
    }
  },
});

export const handleFoodOrdering = (availableMenus, orderDetails, orderedItem, addOrRemove) => {
  return async (dispatch, getState) => {
    const updatedCategory = { ...orderDetails };
    const menuItemIndex = updatedCategory.menuItem.findIndex((item) => item.id === orderedItem.id);
    
    if (menuItemIndex !== -1) {
        const itemQuantity = (updatedCategory.menuItem[menuItemIndex].quantity) ? updatedCategory.menuItem[menuItemIndex].quantity : 0;
        const updatedMenuItem = { ...updatedCategory.menuItem[menuItemIndex], quantity: ( itemQuantity + addOrRemove ) };
        const updatedMenuItemList = [
        ...updatedCategory.menuItem.slice(0, menuItemIndex),
        updatedMenuItem,
        ...updatedCategory.menuItem.slice(menuItemIndex + 1),
        ];
        updatedCategory.menuItem = updatedMenuItemList;
    }
    const updatedMenus = [...availableMenus];
    const objectIndex = availableMenus.findIndex((obj) => obj.id === updatedCategory.id);
    
    if (objectIndex !== -1) {
        updatedMenus[objectIndex] = {...updatedMenus[objectIndex], ...updatedCategory };
    }
    const updatedOrderMenus = await dispatch(setMenu(updatedMenus));
    await dispatch(setTotalItem(addOrRemove));
    return updatedOrderMenus;
  };
};

export const updateCategory = createAsyncThunk(
  "menus/updateCategory",
  async ({ id, category_name }, thunkAPI) => {
    try {
      const response = await MenuService.updateCategory(id, category_name);
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
      if (error.response && error.response.status === 401) {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue();
    }
  }
);

export const createNewItem = createAsyncThunk(
  "menus/createNewItem",
  async ({ item_name, prize, description, menuCategory }, thunkAPI) => {
    try {
      const response = await MenuItemsService.addNewItem(item_name, prize, description, menuCategory);
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
      if (error.response && error.response.status === 401) {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updateItem = createAsyncThunk(
  "menus/updateItem",
  async ({ id, item_name, prize, description, menuCategory }, thunkAPI) => {
    try {
      const response = await MenuItemsService.updateItem(id, item_name, prize, description, menuCategory);
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
      if (error.response && error.response.status === 401) {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue();
    }
  }
);

export const deleteItem = createAsyncThunk(
  "menus/deleteItem",
  async ({ id }, thunkAPI) => {
    try {
      const response = await MenuItemsService.deleteItem(id);
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

const { reducer, actions } = menuSlice;

export const { setMenu, setTotalItem, setOrderDetails } = actions;
export default reducer;