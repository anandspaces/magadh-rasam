import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { MenuItem } from "../components/Menu";

interface FavoritesState {
  items: MenuItem[];
}

const loadFavorites = (): MenuItem[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('favorites');
  return stored ? JSON.parse(stored) : [];
};

const saveFavorites = (items: MenuItem[]) => {
  localStorage.setItem('favorites', JSON.stringify(items));
};

const initialState: FavoritesState = {
  items: loadFavorites(),
};

export const initializeFavorites = createAsyncThunk(
  'favorites/initialize',
  async (_, { dispatch }) => {
    const storedFavorites = loadFavorites();
    dispatch(clearFavorites());
    storedFavorites.forEach(item => dispatch(addToFavorites(item)));
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<MenuItem>) => {
      if (!state.items.some(item => item.name === action.payload.name)) {
        state.items.push(action.payload);
        saveFavorites(state.items);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.name !== action.payload);
      saveFavorites(state.items);
    },
    clearFavorites: (state) => {
      state.items = [];
      saveFavorites(state.items);
    }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(initializeFavorites.fulfilled, (state) => {
  //     // Optional: You can add additional state updates here if needed
  //   });
  // }
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export const selectFavorites = (state: { favorites: FavoritesState }) => state.favorites.items;
export default favoritesSlice.reducer;