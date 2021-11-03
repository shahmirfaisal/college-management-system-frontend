import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/endpoints";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { history } from "../../utils";

export const fetchClasses = createAsyncThunk(
  "student/fetchClasses",
  async () => {
    const res = await axios.get(api.FETCH_CLASSES());
    return res.data.classes;
  }
);

export const createClass = createAsyncThunk(
  "student/createClass",
  async (data) => {
    try {
      const res = await axios.post(api.CREATE_CLASS(), { ...data });
      history.push("/");
      NotificationManager.success("Class added!");
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      console.log(message);
      NotificationManager.error(message);
      throw message;
    }
  }
);

export const updateClass = createAsyncThunk(
  "student/updateClass",
  async (data) => {
    try {
      const res = await axios.patch(api.UPDATE_CLASS(data.id), {
        ...data.class,
      });
      history.push("/");
      NotificationManager.success("Class updated!");
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      console.log(message);
      NotificationManager.error(message);
      throw message;
    }
  }
);

const initialState = {
  classes: [],
  classesLoading: false,
  createClassLoading: false,
  updateClassLoading: false,
};

const classSlice = createSlice({
  name: "class",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state, action) => {
        state.classesLoading = true;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.classesLoading = false;
        state.classes = action.payload;
      })
      .addCase(createClass.pending, (state, action) => {
        state.createClassLoading = true;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.createClassLoading = false;
      })
      .addCase(createClass.rejected, (state, action) => {
        state.createClassLoading = false;
      })
      .addCase(updateClass.pending, (state, action) => {
        state.updateClassLoading = true;
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        state.updateClassLoading = false;
      })
      .addCase(updateClass.rejected, (state, action) => {
        state.updateClassLoading = false;
      });
  },
});

export const classReducer = classSlice.reducer;
