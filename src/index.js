import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {myStore} from "./store/Store"
import App from "./App";
import "./index.css";

ReactDOM.render(
    <Provider store={myStore}>
      <App />
    </Provider>,
  document.getElementById("root")
);
