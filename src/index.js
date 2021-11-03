import { StrictMode } from "react";
import { render } from "react-dom";
import "./index.css";
import { App } from "./App";
import axios from "axios";
import { store } from "./store/";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "react-notifications/lib/notifications.css";

axios.defaults.baseURL = "http://localhost:5000";
axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem("token");
    return config;
  },
  (error) => Promise.reject(error)
);

render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
