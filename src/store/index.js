import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./Categories/categoriesSlice";
import productsSlice from "./Products/productsSlice";
import wishlistSlice from "./Categories/wishlistSlice";
import bannersSlice from "./HomesSection/bannerSlice";

const ecommerceStore = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    products: productsSlice.reducer,
    wishlist: wishlistSlice.reducer,
    banners: bannersSlice.reducer,
  },
});

export default ecommerceStore;
