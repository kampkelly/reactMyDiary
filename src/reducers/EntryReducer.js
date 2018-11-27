import { ALL_ENTRIES } from '../actionTypes/EntryConstants';
import { asyncActionName } from '../util/AsyncUtil';


const initialState = {
  entries: [],
  loading: false,
  success: false,
  failure: false,
};

const entryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case asyncActionName(ALL_ENTRIES).loading:
      return {
        ...state,
        loading: action.payload,
      };
    case asyncActionName(ALL_ENTRIES).success:
      return {
        ...state,
        entries: action.payload, success: true
      };
    case asyncActionName(ALL_ENTRIES).failure:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default entryReducer;
