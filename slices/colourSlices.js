/* eslint-disable no-unused-vars */
// colorSlice.js
import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
  name: "color",
  initialState: null, // Initial state is null, as no color is selected initially
  reducers: {
    selectColor: (state, action) => action.payload, // Reducer to select a color
    clearColor: (state) => null, // Reducer to clear the selected color
  },
});

export const { selectColor, clearColor } = colorSlice.actions;

export default colorSlice.reducer;
