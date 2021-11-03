import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/endpoints";
import axios from "axios";
import { history } from "../../utils";
import { NotificationManager } from "react-notifications";

const initialState = {
  loginLoading: false,
  isLogin: false,
  checkAuthLoading: true,
};

export const login = createAsyncThunk(
  "admin/login",
  async ({ email, password }) => {
    try {
      const res = await axios.post(api.LOGIN(), { email, password });
      NotificationManager.success("Logged in!");
      history.replace("/");
      return res.data.token;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      NotificationManager.error(message);
      throw message;
    }
  }
);

export const isLogin = createAsyncThunk("admin/isLogin", async () => {
  const res = await axios.get(api.IS_LOGIN());
  return res.data.message;
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logout(state, action) {
      state.isLogin = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loginLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.isLogin = true;
        localStorage.setItem("token", `Bearer ${action.payload}`);
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
      })
      .addCase(isLogin.pending, (state, action) => {
        state.checkAuthLoading = true;
      })
      .addCase(isLogin.fulfilled, (state, action) => {
        state.checkAuthLoading = false;
        state.isLogin = true;
      })
      .addCase(isLogin.rejected, (state, action) => {
        state.checkAuthLoading = false;
      });
  },
});

export const { logout } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
