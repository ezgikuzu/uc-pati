import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;

      const isExist = state.items.some((item) => {
        return item.id === product.id;
      });

      if (isExist) {
        state.items = state.items.filter((item) => {
          return item.id !== product.id;
        });
      } else {
        state.items.push(product);
      }
    },

    removeFavorite: (state, action) => {
      state.items = state.items.filter((item) => {
        return item.id !== action.payload;
      });
    },
  },
});

export const { toggleFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;