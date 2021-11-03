import { Home } from "./pages/Home/";
import { Login } from "./pages/Login/";
import { StudentForm } from "./pages/StudentForm/";
import { TeacherForm } from "./pages/TeacherForm/";
import { ClassForm } from "./pages/ClassForm/";

export const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
    key: "/",
  },
  {
    path: "/login",
    component: Login,
    key: "/login",
  },
  {
    path: "/create-student",
    component: StudentForm,
    key: "/create-student",
  },
  {
    path: "/update-student/:id",
    render: () => <StudentForm update />,
    key: "/update-student",
  },
  {
    path: "/create-teacher",
    component: TeacherForm,
    key: "/create-teacher",
  },
  {
    path: "/update-teacher/:id",
    render: () => <TeacherForm update />,
    key: "/update-teacher",
  },
  {
    path: "/create-class",
    component: ClassForm,
    key: "/create-class",
  },
  {
    path: "/update-class/:id",
    render: () => <ClassForm update />,
    key: "/update-class",
  },
];
