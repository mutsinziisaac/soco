import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJ1c2VybmFtZSI6ImR1ZHVkYWRvcGUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzg2Njg5MzAsImV4cCI6MTczODY3MjUzMH0.XVvTQc08AoAOHmpo8DFmG0XU96aCLFLb_WySBLRRNeA";
const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: File[];
};

interface ProductsState {
  products: {
    products: Product[];
    totalPages: number;
  };
  loading: boolean;
  error: string;
}

const initialState: ProductsState = {
  products: {
    products: [],
    totalPages: 0,
  },
  loading: false,
  error: "",
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
);

export const getProduct = createAsyncThunk(
  "products/getProduct",
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

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData: FormData) => {
    try {
      const response = await axios.post(`${baseUrl}/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("error occured when creating a product", error);
    }
  },
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ formData, id }: { formData: FormData; id: number }) => {
    try {
      const response = await axios.put(`${baseUrl}/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("error occured when updating a product", error);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number) => {
    try {
      const response = await axios.delete(`${baseUrl}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("an error occured while deletind", error);
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      })

      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(getProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.products.push(action.payload);
        state.loading = false;
        state.error = "";
      })
      .addCase(createProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(updateProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products.products = state.products.products.filter(
          (product) => product.id !== action.payload.id,
        );
        state.loading = false;
        state.error = "";
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = false;
        state.error = "something went wrong";
      });
  },
});

export default productsSlice.reducer;
