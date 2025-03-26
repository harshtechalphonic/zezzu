import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: [
    {
      id: 14,
      name: "Electronics",
      type: "0",
      image_url:
        "https://demotechalphonic.site/multivendor/assets/uploads/media-uploader/category-4-3-6558b255b81901700311871.webp",
    },
    {
      id: 15,
      name: "Fashion",
      type: "0",
      image_url:
        "https://demotechalphonic.site/multivendor/assets/uploads/media-uploader/category-1-6558971bb6c2a1700304850.webp",
    },
    {
      id: 16,
      name: "Home & Living",
      type: "0",
      image_url:
        "https://demotechalphonic.site/multivendor/assets/uploads/media-uploader/category-2-1-65589718956611700304867.webp",
    },
  ],
  reducers: {
    addInitialItems: (store, action) => {
      return store;
    },
  },
});
export const productsAction = productsSlice.actions;
export default productsSlice;
