import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";

const reducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

export default reducer;
