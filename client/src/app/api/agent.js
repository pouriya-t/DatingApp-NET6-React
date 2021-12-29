import axios from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { PaginatedResponse } from "../models/pagination";

axios.defaults.baseURL = "https://localhost:5001/api/";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

const responseBody = (response) => response.data;

// axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  if (localStorage.getItem("user") !== null) {
    const { token } = JSON.parse(localStorage.getItem("user"));
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep();
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
      return response;
    }
    return response;
  },
  (error) => {
    const { data, status } = error.response;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data);
        break;
      case 401:
        toast.error("Unauthorized");
        break;
      case 403:
        toast.error("You are not allowed to do that");
        break;
      case 500:
        toast.error(data.message);
        history.push("/server-error", { error: data });
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url, params = null) => axios.get(url, { params }).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url, id) => axios.delete(url, id).then(responseBody),
};

const Account = {
  login: (values) => requests.post("account/login", values),
  register: (values) => requests.post("account/register", values),
  uploadPhoto: (values) =>
    requests.post("users/add-photo", values, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    }),
  deletePhoto: (id) => requests.delete(`users/delete-photo/${id}`),
  setMainPhoto: (id) => requests.put(`users/set-main-photo/${id}`),
};

const Like = {
  likeUser: (username) => requests.post(`likes/${username}`),
  getLikes: (params) => requests.get("likes", params),
};

const TestErrors = {
  get500Error: () => requests.get("buggy/server-error"),
  get401Error: () => requests.get("buggy/auth"),
  get404Error: () => requests.get("buggy/not-found"),
  get400Error: () => requests.get("buggy/bad-request"),
};

const User = {
  list: (params) => requests.get("users", params),
  user: (username) => requests.get(`users/${username}`),
  updateProfile: (values) => requests.put("users", values),
};

const agent = {
  User,
  TestErrors,
  Account,
  Like,
};

export default agent;
