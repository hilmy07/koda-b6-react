import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.qty += item.qty || 1;
      } else {
        state.items.push({
          ...item,
          qty: item.qty || 1,
        });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (i) =>
          !(
            i.id === action.payload.id &&
            i.size === action.payload.size &&
            i.temp === action.payload.temp
          ),
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
