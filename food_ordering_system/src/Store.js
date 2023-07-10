import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./Slices/auth";
import messageReducer from "./Slices/message";
import companyStyleReducer from "./Slices/companyStyle";
import menuReducer from './Slices/menus';
import popUpReducer from './Slices/popUpForms';

const reducer = {
  auth: authReducer,
  message: messageReducer,
  companyStyle: companyStyleReducer ,
  menus: menuReducer,
  popUpForms: popUpReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;