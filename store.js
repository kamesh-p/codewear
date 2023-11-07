// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import cartSliceReducer from "./slices/cartSlice";
import themeSliceReducer from "./slices/themeSlice";
import colourReducer from "./slices/colourSlices";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import persistConfig from "./persistConfig";
import authReducer from "./slices/emailSlice";
const persistedCartSliceReducer = persistReducer(
  persistConfig,
  cartSliceReducer
);
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    carts: persistedCartSliceReducer,
    theme: themeSliceReducer,
    emails: authReducer,
    colour: colourReducer,
  },
});
export const persistor = persistStore(store);
