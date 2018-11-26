import { SIGNIN } from '../actionTypes/UserConstants';
import { asyncActionName } from '../util/AsyncUtil';


const initialState = {
  loading: false,
  success: false,
  failure: false
};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case asyncActionName(SIGNIN).loading:
      return {
        ...state,
        loading: action.payload,
      };
    case asyncActionName(SIGNIN).success:
      return {
        ...state,
        success: action.payload,
      };
    case asyncActionName(SIGNIN).failure:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default userReducer;
