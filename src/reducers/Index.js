import { combineReducers } from 'redux';
import user from './UserReducer';
import entry from './EntryReducer';

const rootReducer = combineReducers({
  entry,
  user
});

export default rootReducer;
