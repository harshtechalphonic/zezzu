import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
const ecommerceStore = configureStore({
  reducer: {
    products: productsSlice.reducer,
  },
});
export default ecommerceStore;