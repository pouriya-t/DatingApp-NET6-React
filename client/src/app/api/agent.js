import axios from "axios";

axios.defaults.baseURL = "https://localhost:5001/api/";

const responseBody = (response) => response.data;

const requests = {
  get: (url, params = null) => axios.get(url, { params }).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
};

const Account = {
  login: (values) => requests.post("account/login", values),
  register: (values) => requests.post("account/register", values),
};

const User = {
  list: () => requests.get("users"),
};

const agent = {
  Account,
  User,
};

export default agent;
