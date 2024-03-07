import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./orderSlice";

const store = configureStore({
  reducer: {
    order: orderSlice,
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;