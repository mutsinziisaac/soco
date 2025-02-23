import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJ1c2VybmFtZSI6ImR1ZHVkYWRvcGUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzg2Njg5MzAsImV4cCI6MTczODY3MjUzMH0.XVvTQc08AoAOHmpo8DFmG0XU96aCLFLb_WySBLRRNeA";
const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  categories?: Category[]; // Add categories if needed
  discount?: number;
  uom?: string;
};

interface ProductsState {
  product: Product;
  loading: boolean;
  error: string;
}

const initialState: ProductsState = {
  product: {
    id: 0,
    name: "",
    description: "",
    price: 0,
    images: [],
    // Optionally include:
    categories: [],
    discount: 0,
    uom: "",
  },
  loading: false,
  error: "",
};

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id: number) => {
    try {
      const response = await axios.get(`${baseUrl}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(getProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      });
  },
});

export default productSlice.reducer;
