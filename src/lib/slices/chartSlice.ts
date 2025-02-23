import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJ1c2VybmFtZSI6ImR1ZHVkYWRvcGUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzg2Njg5MzAsImV4cCI6MTczODY3MjUzMH0.XVvTQc08AoAOHmpo8DFmG0XU96aCLFLb_WySBLRRNeA";

export interface ChartData {
  date: string;
  totalRevenue: number;
}

interface ChartDataState {
  chartData: ChartData[];
  loading: boolean;
  error: string;
}

export const getChartData = createAsyncThunk(
  "chartData/getChartData",
  async () => {
    try {
      const response = await axios(`${baseUrl}/dashboard/chart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("an error occured", error);
    }
  },
);

export const chartDataSlice = createSlice({
  name: "chartData",
  initialState: {
    chartData: [],
    loading: false,
    error: "",
  } as ChartDataState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getChartData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.chartData = action.payload;
      })
      .addCase(getChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default chartDataSlice.reducer;
