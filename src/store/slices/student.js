import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/endpoints";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { history } from "../../utils";

export const fetchStudents = createAsyncThunk(
  "student/fetchStudents",
  async () => {
    const res = await axios.get(api.FETCH_STUDENTS());
    return res.data.students;
  }
);

export const createStudent = createAsyncThunk(
  "student/createStudent",
  async (data) => {
    try {
      const res = await axios.post(api.CREATE_STUDENT(), { ...data });
      history.push("/");
      NotificationManager.success("Student added!");
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      console.log(message);
      NotificationManager.error(message);
      throw message;
    }
  }
);

export const updateStudent = createAsyncThunk(
  "student/updateStudent",
  async (data) => {
    try {
      const res = await axios.patch(api.UPDATE_STUDENT(data.id), {
        ...data.student,
      });
      history.push("/");
      NotificationManager.success("Student udpated!");
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      console.log(message);
      NotificationManager.error(message);
      throw message;
    }
  }
);

const initialState = {
  students: [],
  studentsLoading: false,
  createStudentLoading: false,
  updateStudentLoading: false,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state, action) => {
        state.studentsLoading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.studentsLoading = false;
        state.students = action.payload;
      })
      .addCase(createStudent.pending, (state, action) => {
        state.createStudentLoading = true;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.createStudentLoading = false;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.createStudentLoading = false;
      })
      .addCase(updateStudent.pending, (state, action) => {
        state.updateStudentLoading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.updateStudentLoading = false;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.updateStudentLoading = false;
      });
  },
});

export const studentReducer = studentSlice.reducer;
