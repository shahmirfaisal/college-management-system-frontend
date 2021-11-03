// Students
export const FETCH_STUDENTS = () => "/student";
export const FETCH_STUDENT = (id) => `/student/${id}`;
export const CREATE_STUDENT = () => "/student";
export const UPDATE_STUDENT = (id) => `/student/${id}`;
export const DELETE_STUDENT = (id) => `/student/${id}`;

// Teachers
export const FETCH_TEACHERS = () => "/teacher";
export const FETCH_TEACHER = (id) => `/teacher/${id}`;
export const CREATE_TEACHER = () => "/teacher";
export const UPDATE_TEACHER = (id) => `/teacher/${id}`;
export const DELETE_TEACHER = (id) => `/teacher/${id}`;

// Classes
export const FETCH_CLASSES = () => "/class";
export const FETCH_CLASS = (id) => `/class/${id}`;
export const CREATE_CLASS = () => "/class";
export const UPDATE_CLASS = (id) => `/class/${id}`;
export const DELETE_CLASS = (id) => `/class/${id}`;

// Admin
export const LOGIN = () => `/admin/login`;
export const IS_LOGIN = () => `/admin/is-login`;
