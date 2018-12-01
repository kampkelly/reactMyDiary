import { NEW_ENTRY, SHOW_ENTRY, UPDATE_ENTRY, ALL_ENTRIES, PAGINATED_ENTRIES, DELETE_ENTRY } from '../actionTypes/EntryConstants';
import { asyncActionName } from '../util/AsyncUtil';


const initialState = {
  entries: [],
  entry: {},
  paginatedEntries: [],
  loading: false,
  message: '',
  success: false,
  failure: false,
};

const EntryReducer = (state = initialState, action = {}) => {
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
    case asyncActionName(SHOW_ENTRY).loading:
      return {
        ...state,
        loading: action.payload,
      };
    case asyncActionName(SHOW_ENTRY).success:
      return {
        ...state,
        entry: action.payload, success: true
      };
    case asyncActionName(SHOW_ENTRY).failure:
      return {
        ...state, message: action.payload.error
      };
    case asyncActionName(UPDATE_ENTRY).loading:
      return {
        ...state,
        loading: action.payload,
      };
    case asyncActionName(UPDATE_ENTRY).success:
      return {
        ...state,
        entry: action.payload, success: true
      };
    case asyncActionName(UPDATE_ENTRY).failure:
      document.getElementById('loading').style.display = 'none';
      document.querySelector('.form_error_text').style.display = 'block';
      document.querySelector('.form_error_text small').textContent = action.payload.error;
      return {
        ...state, message: action.payload.error
      };
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
    case asyncActionName(PAGINATED_ENTRIES).loading:
      return {
        ...state,
        loading: action.payload,
      };
    case asyncActionName(PAGINATED_ENTRIES).success:
      return {
        ...state,
        paginatedEntries: action.payload, success: true
      };
    case asyncActionName(PAGINATED_ENTRIES).failure:
      return {
        ...state,
      };
      case asyncActionName(DELETE_ENTRY).loading:
      return {
        ...state,
        loading: action.payload,
      };
    case asyncActionName(DELETE_ENTRY).success:
      return {
        ...state,
        entry: {}, success: true
      };
    case asyncActionName(DELETE_ENTRY).failure:
      return {
        ...state, message: action.payload.error
      };
    default:
      return state;
  }
};

export default EntryReducer;
