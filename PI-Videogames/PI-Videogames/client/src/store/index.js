import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducer/index";
import thunk from "redux-thunk";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose; // esto sirve para utilizar redux tool extension

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
); // middleware --> interlocutor entre actividad asincrona y el reducer.

export default store;
