import { combineReducers } from 'redux';
import activityReducer from '../activity';
import feedReducer from '../feed';
import noticeReducer from '../notice';
import user from '../user';
import partner from '../partner';
import adminReducer from '../admin';
import topbar from '../topbar';

const rootReducer = combineReducers({
  activityReducer,
  feedReducer,
  noticeReducer,
  user,
  partner,
  adminReducer,
  topbar
});

export default rootReducer;