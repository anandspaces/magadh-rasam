// src/store/favoritesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuItem } from "../components/Menu";

interface FavoritesState {
  items: MenuItem[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<MenuItem>) => {
      if (!state.items.some(item => item.name === action.payload.name)) {
        state.items.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    clearFavorites: (state) => {
      state.items = [];
    }
  }
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export const selectFavorites = (state: { favorites: FavoritesState }) => state.favorites.items;
export default favoritesSlice.reducer;