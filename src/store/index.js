import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./Categories/categoriesSlice";
import productsSlice from "./Categories/productsSlice";
import wishlistSlice from "./Categories/wishlistSlice";

const ecommerceStore = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    products: productsSlice.reducer,
    wishlist: wishlistSlice.reducer,
  },
});

export default ecommerceStore;
