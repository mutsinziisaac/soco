import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJ1c2VybmFtZSI6ImR1ZHVkYWRvcGUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzg2Njg5MzAsImV4cCI6MTczODY3MjUzMH0.XVvTQc08AoAOHmpo8DFmG0XU96aCLFLb_WySBLRRNeA";

type Users = {
  id?: number;
  name: string;
  tel: string;
  password: string;
  email: string;
  role: string;
  image: string;
  _count: {
    orders: number;
  };
};

type CreateUser = {
  id?: number;
  name: string;
  tel: string;
  password: string;
  email: string;
  role: string;
};

interface UsersState {
  users: {
    users: Users[];
    totalPages: number;
  };
  loading: boolean;
  error: string;
}

const initialState: UsersState = {
  users: {
    users: [],
    totalPages: 0,
  },
  loading: false,
  error: "",
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const response = await axios(`${baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("error fetching users:", error);
  }
});

export const createUser = createAsyncThunk(
  "users/createUsers",
  async (userData: CreateUser) => {
    try {
      const response = await axios.post(`${baseUrl}/users`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("an erroe occured creating user", { cause: error });
    }
  },
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({
    userData,
    updateId,
  }: {
    userData: CreateUser;
    updateId: number;
  }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/users/${updateId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error("an erroe occured updating user", { cause: error });
    }
  },
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number) => {
    try {
      const response = await axios.delete(`${baseUrl}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("error occured deleting user", { cause: error });
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //get users
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      })
      //create user
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.users.push(action.payload);
        state.loading = false;
        state.error = "";
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      })
      //update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.users.findIndex(
          (user) => user.id === action.payload.id,
        );
        state.users.users[index] = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      })
      //delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users.users = state.users.users.filter(
          (user) => user.id !== action.payload.id,
        );
        state.loading = false;
        state.error = "";
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      });
  },
});

export default usersSlice.reducer;
