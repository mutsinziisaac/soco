import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJ1c2VybmFtZSI6ImR1ZHVkYWRvcGUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzg2Njg5MzAsImV4cCI6MTczODY3MjUzMH0.XVvTQc08AoAOHmpo8DFmG0XU96aCLFLb_WySBLRRNeA";

export interface Order {
  id: number;
  userId: number;
  orderDate: string; // Alternatively, you can use Date if you're converting the string to a Date object
  totalAmount: number;
  orderStatus: string;
  paymentMethod: string;
  shippingAddressId: number;
  shippingAddress: ShippingAddress;
  user: User;
  orderItems: OrderItem[];
}

export interface ShippingAddress {
  fullAddress: string;
}

export interface User {
  name: string;
  tel: string;
  image: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Product {
  name: string;
  images: string[];
}

interface OrderState {
  order: Partial<Order>;
  loading: boolean;
  error: string;
}

export const getOneOrder = createAsyncThunk(
  "order/getOneOrder",
  async (id: number) => {
    try {
      const response = await axios(`${baseUrl}/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`An error fetching orders`, { cause: error });
    }
  },
);

export const changeOrderStatus = createAsyncThunk(
  "order/changeOrderStatus",
  async ({ orderId, status }: { orderId: number; status: string }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/orders/status/${orderId}`,
        JSON.stringify({ orderStatus: status }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error("error changing status", { cause: error });
    }
  },
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id: number) => {
    try {
      const response = await axios.delete(`${baseUrl}/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("error occured deleting category", { cause: error });
    }
  },
);

export const singleOrderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    loading: false,
    error: "",
  } as OrderState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOneOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOneOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(changeOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.order.orderStatus = action.payload.order;
      })
      .addCase(changeOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        state.loading = false;
        state.order = {};
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default singleOrderSlice.reducer;
