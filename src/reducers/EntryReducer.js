import { NEW_ENTRY } from '../actionTypes/EntryConstants';
import { asyncActionName } from '../util/AsyncUtil';


const initialState = {
  entries: [],
  entry: {},
  loading: false,
  success: false,
  failure: false,
};

const entryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case asyncActionName(NEW_ENTRY).loading:
      return {
        ...state,
        loading: action.payload,
      };
    case asyncActionName(NEW_ENTRY).success:
      return {
        ...state,
        success: action.payload
      };
    case asyncActionName(NEW_ENTRY).failure:
      document.getElementById('loading').style.display = 'none';
      document.querySelector('.form_error_text').style.display = 'block';
      document.querySelector('.form_error_text small').textContent = action.payload.error;
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default entryReducer;