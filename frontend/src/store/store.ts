import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orderSlice";
import cartReducer from "./cartSlice"; // Import the new cart slice

export const store = configureStore({
  reducer: {
    order: orderReducer,
    cart: cartReducer, // Add cart to the store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
