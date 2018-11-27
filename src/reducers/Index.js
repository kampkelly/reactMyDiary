import { combineReducers } from 'redux';
import entry from './EntryReducer';
import user from './UserReducer';

const rootReducer = combineReducers({
  entry,
  user
});

export default rootReducer;
