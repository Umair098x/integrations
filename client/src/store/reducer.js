import error from "./error";
import loader from "./loader";
import { REHYDRATE } from "redux-persist";
import credentials from "@/store/credentials";
import alert from "./alert";

export default function reducer(state, action) {
  if (action.type === REHYDRATE && action.payload) {
    return {
      entities: {
        ...state?.entities,
        credentials: action?.payload?.entities?.credentials, // Update made here
      },
    };
  } else if (action.type === 'logout') {
    localStorage.removeItem("persist:root");
    return {
      entities: {
        credentials: credentials(undefined, action),
        error: error(undefined, action),
        loader: loader(undefined, action),
        alert: alert(undefined, action),
      },
    };
  } else if (action.type === "loginalltabs") {
    return {
      entities: {
        ...state?.entities,
        credentials: action?.payload, // Update made here
        error: error(state?.entities?.error, action),
        loader: loader(state?.entities?.loader, action),
        alert: alert(state?.entities?.alert, action),
      },
    };
  } else {
    action.store = state;
    return {
      entities: {
        credentials: credentials(state?.entities?.credentials, action),
        error: error(state?.entities?.error, action),
        loader: loader(state?.entities?.loader, action),
        alert: alert(state?.entities?.alert, action),
      },
    };
  }
}
