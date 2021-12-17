import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { store } from "../store/configureStore";

axios.defaults.baseURL = "https://localhost:5001/api/";

const responseBody = (response) => response.data;

axios.interceptors.response.use(
  async (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
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
        console.log(data);
        // window.location.pathname = "/server-error";
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
};

const Account = {
  login: (values) => requests.post("account/login", values),
  register: (values) => requests.post("account/register", values),
};

const TestErrors = {
  get500Error: () => requests.get("buggy/server-error"),
  get401Error: () => requests.get("buggy/auth"),
  get404Error: () => requests.get("buggy/not-found"),
  get400Error: () => requests.get("buggy/bad-request"),
};

const User = {
  list: () => requests.get("users"),
};

const agent = {
  User,
  TestErrors,
  Account,
};

export default agent;
