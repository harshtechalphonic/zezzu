import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./Categories/categoriesSlice";
import productsSlice from "./Products/productsSlice";
import wishlistSlice from "./Products/wishlistSlice";
import bannersSlice from "./HomesSection/bannerSlice";
import cartSlice from "./Products/cartSlice";

const ecommerceStore = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    products: productsSlice.reducer,
    wishlist: wishlistSlice.reducer,
    banners: bannersSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default ecommerceStore;
