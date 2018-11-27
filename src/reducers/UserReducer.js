import { SIGNIN, SIGNUP, SIGNOUT } from '../actionTypes/UserConstants';
import { asyncActionName } from '../util/AsyncUtil';


const initialState = {
  isAuth: false,
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
        success: action.payload, isAuth: true
      };
    case asyncActionName(SIGNIN).failure:
      document.querySelector('.form_error_text').style.display = 'block';
      document.querySelector('.form_error_text small').textContent = action.payload.error;
      return {
        ...state,
      };
    case asyncActionName(SIGNUP).loading:
      return {
        ...state,
        loading: action.payload,
      };
    case asyncActionName(SIGNUP).success:
      return {
        ...state,
        success: action.payload,
      };
    case asyncActionName(SIGNUP).failure:
      document.querySelector('.form_error_text').style.display = 'block';
      document.querySelector('.form_error_text small').textContent = action.payload.error;
      return {
        ...state,
      };
    case asyncActionName(SIGNOUT).success:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
