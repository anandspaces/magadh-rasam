import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

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

// Constants
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || "fallback_secret_key";
const STORAGE_KEY = "encryptedOrderState";
const EXPIRY_KEY = "orderExpiry";
const ORDER_EXPIRY_TIME = 86400000; // 24 hours in milliseconds

// Utility Functions
const getCurrentTimestamp = () => new Date().toISOString();

const encryptData = (data: OrderState): string => 
  CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();

const decryptData = (ciphertext: string): OrderState | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};

// sessionStorage Helper with Encryption
const sessionStorageHelper = {
  get: (): OrderState | undefined => {
    try {
      const encryptedData = sessionStorage.getItem(STORAGE_KEY);
      const expiry = sessionStorage.getItem(EXPIRY_KEY);
      
      if (!encryptedData || !expiry) return undefined;

      const expiryTime = parseInt(expiry, 10);
      if (isNaN(expiryTime) || Date.now() > expiryTime) {
        sessionStorageHelper.remove();
        return undefined;
      }

      return decryptData(encryptedData) || undefined;
    } catch (error) {
      console.error("sessionStorage read error:", error);
      return undefined;
    }
  },

  set: (value: OrderState): void => {
    try {
      sessionStorage.setItem(STORAGE_KEY, encryptData(value));
      sessionStorage.setItem(EXPIRY_KEY, (Date.now() + ORDER_EXPIRY_TIME).toString());
    } catch (error) {
      console.error("sessionStorage write error:", error);
    }
  },

  remove: (): void => {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(EXPIRY_KEY);
  }
};

// Clear expired data on load
(() => {
  const expiry = sessionStorage.getItem(EXPIRY_KEY);
  if (expiry && Date.now() > parseInt(expiry, 10)) {
    sessionStorageHelper.remove();
  }
})();

// Initial State
const initialState: OrderState = sessionStorageHelper.get() || {
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

// Redux Slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: {
      reducer: (_, action: PayloadAction<OrderState>) => {
        sessionStorageHelper.set(action.payload);
        return action.payload;
      },
      prepare: (order: Omit<OrderState, "id" | "createdAt" | "updatedAt">) => ({
        payload: {
          ...order,
          id: crypto.randomUUID?.() || Math.random().toString(36).substring(2),
          createdAt: getCurrentTimestamp(),
          updatedAt: getCurrentTimestamp(),
        }
      })
    },

    updateOrder: (state, action: PayloadAction<Partial<OrderState>>) => {
      const updatedState = { ...state, ...action.payload, updatedAt: getCurrentTimestamp() };
      sessionStorageHelper.set(updatedState);
      return updatedState;
    },

    clearOrder: () => {
      sessionStorageHelper.remove();
      return { ...initialState, id: "" };
    }
  }
});

// Selectors
export const selectOrder = (state: { order: OrderState }) => state.order;
export const selectOrderItems = (state: { order: OrderState }) => state.order.orderItems;
export const selectTotalAmount = (state: { order: OrderState }) => state.order.totalAmount;

export const { setOrder, updateOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
