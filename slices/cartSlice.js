import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {}, // Initial state for the cart, an empty object.
  reducers: {
    addToCart: (state, action) => {
      const { itemcode, qty, price, name, size, variant, img, user } =
        action.payload;
      const cartKey = `${itemcode}-${variant}-${size}`;
      if (state[cartKey]) {
        state[cartKey].qty += qty;
      } else {
        state[cartKey] = { qty, price, name, size, variant, img, user };
      }
    },
    removeFromCart: (state, action) => {
      const itemcode = action.payload;
      if (state[itemcode]) {
        state[itemcode].qty -= 1;
        if (state[itemcode].qty <= 0) {
          delete state[itemcode];
        }
      }
    },
    clearCart: (state) => {
      return {}; // Reset the cart to an empty object.
    },
    loadCart: (state, action) => {
      return action.payload; // Load the cart from a payload (an object).
    },
    increaseQuantity: (state, action) => {
      const itemcode = action.payload;
      if (state[itemcode]) {
        state[itemcode].qty += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const itemcode = action.payload;
      if (state[itemcode] && state[itemcode].qty > 1) {
        state[itemcode].qty -= 1;
      } else if (state[itemcode] && state[itemcode].qty === 1) {
        delete state[itemcode];
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  loadCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
