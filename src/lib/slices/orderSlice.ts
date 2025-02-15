import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJ1c2VybmFtZSI6ImR1ZHVkYWRvcGUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzg2Njg5MzAsImV4cCI6MTczODY3MjUzMH0.XVvTQc08AoAOHmpo8DFmG0XU96aCLFLb_WySBLRRNeA";

interface Orders {
  id?: number;
  orderStatus: string;
}

interface OrderState {
  orders: {
    orders: Orders[];
    totalPages: number;
  };
  loading: boolean;
  error: string;
}

export const getOrders = createAsyncThunk("orders/getOrders", async () => {
  try {
    const response = await axios(`${baseUrl}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`An error fetching orders: ${error.message}`);
  }
});

export const getOneOrder = createAsyncThunk(
  "orders/getOneOrder",
  async (id: number) => {
    try {
      const response = await axios(`${baseUrl}/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`An error fetching orders: ${error.message}`);
    }
  },
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData: any) => {
    const response = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error("Failed to create order");
    }
    const data = await response.json();
    return data;
  },
);

export const orderReceived = createAction<Orders>("orders/orderReceived");

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: {
      orders: [],
      totalPages: 0,
    },
    loading: false,
    error: "",
  } as OrderState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(getOneOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.orders = action.payload;
      })
      .addCase(getOneOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.orders.unshift(action.payload); // Add to the top
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(orderReceived, (state, action) => {
        state.orders.orders.unshift(action.payload);
      });
  },
});

export default orderSlice.reducer;
