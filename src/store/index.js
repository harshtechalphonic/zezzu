import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./Categories/categoriesSlice";
import productsSlice from "./Products/productsSlice";
import wishlistSlice from "./Products/wishlistSlice";
import bannersSlice from "./HomesSection/bannerSlice";
import cartSlice from "./Products/cartSlice";
import filtersSlice from "./Products/filtersSlice";
import allCategoriesSlice from "./Categories/allCategoriesSlice";
import singleProductSlice from "./Products/singleProductSlice";

const ecommerceStore = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    products: productsSlice.reducer,
    wishlist: wishlistSlice.reducer,
    banners: bannersSlice.reducer,
    cart: cartSlice.reducer,
    filters: filtersSlice.reducer,
    allCategories: allCategoriesSlice.reducer,
    singleProduct: singleProductSlice.reducer,
  },
});

export default ecommerceStore;
