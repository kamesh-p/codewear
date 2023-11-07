// persistConfig.js
import storage from "redux-persist/lib/storage"; // You can choose the storage engine you prefer

const persistConfig = {
  key: "root", // the key under which your store will be saved
  storage, // choose your storage engine
};

export default persistConfig;
