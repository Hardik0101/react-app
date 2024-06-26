import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dataReducer from "./dataSlice";
import detailsReducer from "./detailsSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["data", "details", "checkout"],
};

const rootReducer = combineReducers({
  data: dataReducer,
  details: detailsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
