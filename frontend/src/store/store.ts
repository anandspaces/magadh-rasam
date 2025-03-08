import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import orderReducer from "./orderSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
    cart: cartReducer,
  },
});

// Infer RootState from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
