import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: 0,
  reducers: {
    addWishlist: (store, action) => {
      return action.payload;
    },
  },
});
//dsdsdskdk
export const wishlistAction = wishlistSlice.actions;
export default wishlistSlice;
