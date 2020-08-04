import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import {reducers} from "./reducers/Reducers";

export const myStore = createStore(
  reducers,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
