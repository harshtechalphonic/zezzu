import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./Categories/categoriesSlice";
const ecommerceStore = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
  },
});
export default ecommerceStore;