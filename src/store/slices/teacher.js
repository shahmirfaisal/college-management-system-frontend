import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/endpoints";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { history } from "../../utils";

export const fetchTeachers = createAsyncThunk(
  "student/fetchTeachers",
  async () => {
    const res = await axios.get(api.FETCH_TEACHERS());
    return res.data.teachers;
  }
);

export const createTeacher = createAsyncThunk(
  "student/createTeacher",
  async (data) => {
    try {
      const res = await axios.post(api.CREATE_TEACHER(), { ...data });
      history.push("/");
      NotificationManager.success("Teacher added!");
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      console.log(message);
      NotificationManager.error(message);
      throw message;
    }
  }
);

export const updateTeacher = createAsyncThunk(
  "student/updateTeacher",
  async (data) => {
    try {
      const res = await axios.patch(api.UPDATE_TEACHER(data.id), {
        ...data.teacher,
      });
      history.push("/");
      NotificationManager.success("Teacher updated!");
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      console.log(message);
      NotificationManager.error(message);
      throw message;
    }
  }
);

const initialState = {
  teachers: [],
  teachersLoading: false,
  createTeacherLoading: false,
  updateTeacherLoading: false,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state, action) => {
        state.teachersLoading = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.teachersLoading = false;
        state.teachers = action.payload;
      })
      .addCase(createTeacher.pending, (state, action) => {
        state.createTeacherLoading = true;
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.createTeacherLoading = false;
      })
      .addCase(createTeacher.rejected, (state, action) => {
        state.createTeacherLoading = false;
      })
      .addCase(updateTeacher.pending, (state, action) => {
        state.updateTeacherLoading = true;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.updateTeacherLoading = false;
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.updateTeacherLoading = false;
      });
  },
});

export const teacherReducer = teacherSlice.reducer;
