import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app/layout/App";
import { store } from "./app/store/configureStore";
import { createBrowserHistory } from "history";
import CustomRouter from "./app/layout/CustomRouter";

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <CustomRouter history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </CustomRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
