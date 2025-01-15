import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../utils/userSlice";
import cartSlice from "../utils/cartSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice
  },
});

export default store;
