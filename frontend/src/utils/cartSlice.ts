import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  pizzaId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state: CartState, action: PayloadAction<CartItem>) => {
      state.cart.push(action.payload); // payload = newItem
    },
    removeItem: (state: CartState, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload); // payload = itemId
    },
    increaseItem: (state: CartState, action: PayloadAction<number>) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItem: (state: CartState, action: PayloadAction<number>) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item && item.quantity > 0) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    clearCart: (state: CartState) => {
      state.cart = [];
    },
  },
});

export const { addItem, removeItem, increaseItem, decreaseItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state: { cart: CartState }) => state.cart.cart;

export const getTotalCartQuantity = (state: { cart: CartState }) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state: { cart: CartState }) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id: number) => (state: { cart: CartState }) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;