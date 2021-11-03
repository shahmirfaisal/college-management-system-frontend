import { configureStore } from "@reduxjs/toolkit";
import { studentReducer } from "./slices/student";
import { teacherReducer } from "./slices/teacher";
import { classReducer } from "./slices/class";
import { adminReducer } from "./slices/admin";

export const store = configureStore({
  reducer: {
    student: studentReducer,
    teacher: teacherReducer,
    class: classReducer,
    admin: adminReducer,
  },
});
