import { combineReducers } from "redux";
import credentials from "./credentials";
import loader from "./loaderReducer";
import error from "./error";
import alert from "./alert";
export default combineReducers({
  credentials: credentials,
  loader: loader,
  error: error,
  alert: alert,
});
