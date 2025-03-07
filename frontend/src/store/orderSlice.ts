import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interface Definitions
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface OrderState {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  orderItems: OrderItem[];
  instructions: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

// LocalStorage Helper with Type Safety
const localStorageHelper = {
  get: (key: string): OrderState | undefined => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) as OrderState : undefined;
    } catch (error) {
      console.error("LocalStorage read error:", error);
      return undefined;
    }
  },
  set: (key: string, value: OrderState): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("LocalStorage write error:", error);
    }
  },
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("LocalStorage remove error:", error);
    }
  }
};

// Initial State with Type Assertion
const initialState: OrderState = localStorageHelper.get("orderState") || {
  id: "",
  customerName: "",
  phone: "",
  address: "",
  orderItems: [],
  instructions: "",
  totalAmount: 0,
  createdAt: "",
  updatedAt: ""
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: {
      reducer: (_, action: PayloadAction<OrderState>) => {
        localStorageHelper.set("orderState", action.payload);
        return action.payload;
      },
      prepare: (order: Omit<OrderState, "id" | "createdAt" | "updatedAt">) => ({
        payload: {
          ...order,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      })
    },
    updateOrder: (state, action: PayloadAction<Partial<OrderState>>) => {
      const updatedState = {
        ...state,
        ...action.payload,
        updatedAt: new Date().toISOString()
      };
      localStorageHelper.set("orderState", updatedState);
      return updatedState;
    },
    clearOrder: () => {
      localStorageHelper.remove("orderState");
      return { ...initialState, id: "" };
    }
  }
});

// Selectors with RootState Type
export const selectOrder = (state: { order: OrderState }) => state.order;
export const selectOrderItems = (state: { order: OrderState }) => 
  state.order.orderItems;
export const selectTotalAmount = (state: { order: OrderState }) =>
  state.order.totalAmount;

export const { setOrder, updateOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;