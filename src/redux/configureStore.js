import { applyMiddleware, combineReducers } from "redux";
import { legacy_createStore} from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { fetchToBackend } from "./features/fetchToBackend";

export const store = legacy_createStore(
    combineReducers({ fetchToBackend }),
    composeWithDevTools(applyMiddleware(thunk))
  );