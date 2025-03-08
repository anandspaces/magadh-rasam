import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

// Initial State
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

// Redux Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(item => item.name === action.payload);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.name !== action.payload);
        }

        state.totalQuantity -= 1;
        state.totalPrice -= existingItem.price;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    }
  }
});

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectTotalQuantity = (state: { cart: CartState }) => state.cart.totalQuantity;
export const selectTotalPrice = (state: { cart: CartState }) => state.cart.totalPrice;

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
