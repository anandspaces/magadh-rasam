import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderItem {
  name: string;
  quantity: number;
}

interface OrderState {
  customerName: string;
  phone: string;
  address: string;
  orderItems: OrderItem[];
  instructions: string;
  totalAmount: string;
  estimatedTime: string;
  deliveryAddress: string;
}

const initialState: OrderState = {
  customerName: "",
  phone: "",
  address: "",
  orderItems: [],
  instructions: "",
  totalAmount: "",
  estimatedTime: "",
  deliveryAddress: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<OrderState>) => {
      return { ...state, ...action.payload };
    },
    clearOrder: () => initialState,
  },
});

export const { setOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
