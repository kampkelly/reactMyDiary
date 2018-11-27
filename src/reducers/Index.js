import { combineReducers } from 'redux';
import user from './userReducer';
import entry from './EntryReducer';

const rootReducer = combineReducers({
  entry,
  user
});

export default rootReducer;
