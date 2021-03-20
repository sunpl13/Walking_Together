import { combineReducers } from 'redux';
import activityReducer from '../activity';
import feedReducer from '../feed';
import noticeReducer from '../notice';
import user from '../user';

const rootReducer = combineReducers({
  activityReducer,
  feedReducer,
  noticeReducer,
  user
});

export default rootReducer;