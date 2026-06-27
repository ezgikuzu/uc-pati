import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.items.find((item) => {
        return item.id === product.id;
      });

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    increaseQuantity: (state, action) => {
      const product = state.items.find((item) => {
        return item.id === action.payload;
      });

      if (product) {
        product.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const product = state.items.find((item) => {
        return item.id === action.payload;
      });

      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => {
            return item.id !== action.payload;
          });
        }
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => {
        return item.id !== action.payload;
      });
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;