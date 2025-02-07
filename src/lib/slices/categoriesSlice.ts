import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJ1c2VybmFtZSI6ImR1ZHVkYWRvcGUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzg2Njg5MzAsImV4cCI6MTczODY3MjUzMH0.XVvTQc08AoAOHmpo8DFmG0XU96aCLFLb_WySBLRRNeA";

type Categories = {
  id?: number;
  name: string;
  description: string;
};

interface CategoriesState {
  categories: {
    categories: Categories[];
    totalPages: number;
  };
  loading: boolean;
  error: string;
}

const initialState: CategoriesState = {
  categories: {
    categories: [],
    totalPages: 0,
  },
  loading: false,
  error: "",
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    try {
      const response = await axios(`${baseUrl}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("error fetching categories:", error);
    }
  },
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (categoryData: Categories) => {
    const response = await fetch(`${baseUrl}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      throw new Error("Failed to create category");
    }
    const data = await response.json();
    return data;
  },
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: number) => {
    const response = await fetch(`${baseUrl}/categories/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete category");
    }
    const data = await response.json();
    return data;
  },
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //get categories
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(getCategories.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      })
      //create category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.categories.push(action.payload);
        state.loading = false;
        state.error = "";
      })
      .addCase(createCategory.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      })
      //delete category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories.categories = state.categories.categories.filter(
          (category) => category.id !== action.payload.id,
        );
        state.loading = false;
        state.error = "";
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      });
  },
});

export default categoriesSlice.reducer;
