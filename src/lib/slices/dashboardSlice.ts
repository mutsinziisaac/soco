import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJ1c2VybmFtZSI6ImR1ZHVkYWRvcGUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzg2Njg5MzAsImV4cCI6MTczODY3MjUzMH0.XVvTQc08AoAOHmpo8DFmG0XU96aCLFLb_WySBLRRNeA";

export interface DashboardData {
  totalRevenue: {
    _sum: {
      totalAmount: number;
    };
  };

  totalOrders: number;

  users: number;

  totalMonthlyRevenue: {
    _sum: {
      totalAmount: number;
    };
  };
}

interface DashboardDataState {
  dashboardData: DashboardData;
  loading: boolean;
  error: string;
}

export const getDashboardData = createAsyncThunk(
  "dashboard/getDashboardData",
  async () => {
    try {
      const response = await axios(`${baseUrl}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("an error occured", { cause: error });
    }
  },
);

export const dashboardDataSlice = createSlice({
  name: "dashboardData",
  initialState: {
    dashboardData: {},
    loading: false,
    error: "",
  } as DashboardDataState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default dashboardDataSlice.reducer;
