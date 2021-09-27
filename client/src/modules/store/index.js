import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import activityReducer from "../activity";
import feedReducer from "../feed";
import noticeReducer from "../notice";
import user from "../user";
import partner from "../partner";
import adminReducer from "../admin";
import topbar from "../topbar";

const persistConfig = {
  key: "root",
  storage
};

const rootReducer = combineReducers({
  activityReducer,
  feedReducer,
  noticeReducer,
  user,
  partner,
  adminReducer,
  topbar
});

export default persistReducer(persistConfig, rootReducer);