import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

const initialState = {
  sfProducts: {
    categories: [],
    totalPages: 0,
  },
  loading: false,
  error: "",
};

export const getSFProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await fetch(`${baseUrl}/storefront`);
    const data = await response.json();
    return data;
  }
);

const getSFProductsSlice = createSlice({
  name: "storefront",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSFProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSFProducts.fulfilled, (state, action) => {
        state.sfProducts = action.payload;
        state.loading = false;
      })
      .addCase(getSFProducts.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
        state.loading = false;
      });
  },
});

export default getSFProductsSlice.reducer;
