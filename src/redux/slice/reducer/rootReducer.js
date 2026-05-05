import { combineReducers } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";

const rootReducer = combineReducers({
    // Add Your Slice Reducers Here
    auth : authReducer,
    cart : cartReducer,
    product : productReducer,
})


export default rootReducer;