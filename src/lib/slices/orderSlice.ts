import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

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
  const response = await fetch(`${baseUrl}/orders`);
  const data = await response.json();
  return data;
});

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
  }
);

export const changeOrderStatus = createAsyncThunk(
  "orders/changeOrderStatus",
  async ({ orderId, status }: any) => {
    const response = await fetch(`${baseUrl}/orders/status/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderStatus: status }),
    });
    if (!response.ok) {
      throw new Error("Failed to update order status");
    }
    const data = await response.json();
    return data;
  }
);

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
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default orderSlice.reducer;
