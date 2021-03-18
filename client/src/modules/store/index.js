import { combineReducers } from 'redux';
import activityReducer from '../activity';
import feedReducer from '../feed';
import noticeReducer from '../notice';

const rootReducer = combineReducers({
  activityReducer,
  feedReducer,
  noticeReducer
});

export default rootReducer;