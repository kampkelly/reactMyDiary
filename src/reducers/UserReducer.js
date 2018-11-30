import { SIGNIN, SIGNUP, SIGNOUT, PROFILE, NOTIFICATION, UPDATE_PROFILE } from '../actionTypes/UserConstants';
import { asyncActionName } from '../util/AsyncUtil';


const initialState = {
  isAuth: false,
  loading: false,
  message: '',
  success: false,
  failure: false,
  user: {}
};

const UserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case asyncActionName(SIGNIN).loading:
      return {
        ...state,
        loading: action.payload,
      };
    case asyncActionName(SIGNIN).success:
      return {
        ...state,
        success: true, ...action.payload.user, isAuth: true
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
    case asyncActionName(PROFILE).loading:
      return {
        ...state,
        loading: action.payload,
      };
    case asyncActionName(PROFILE).success:
      return {
        ...state,
        success: true, user: action.payload
      };
    case asyncActionName(PROFILE).failure:
      return {
        ...state,
      };
    case asyncActionName(UPDATE_PROFILE).loading:
      return {
        ...state,
        loading: action.payload,
      };
    case asyncActionName(UPDATE_PROFILE).success:
      return {
        ...state,
        message: action.payload.message, success: true, user: action.payload.user
      };
    case asyncActionName(UPDATE_PROFILE).failure:
      document.querySelector('.form_error_text').style.display = 'block';
			document.querySelector('.form_error_text small').textContent = data.message;
      return {
        ...state,
      };
    case asyncActionName(NOTIFICATION).loading:
      return {
        ...state,
        loading: action.payload,
      };
    case asyncActionName(NOTIFICATION).success:
      return {
        ...state,
        success: true, message: action.payload.message, user: action.payload.user
      };
    case asyncActionName(NOTIFICATION).failure:
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
