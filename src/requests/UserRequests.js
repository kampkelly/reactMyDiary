import axios from 'axios';
import { createBrowserHistory } from 'history';

import setAuthToken from '../util/AuthTokenUtil';
import { asyncActions } from '../util/AsyncUtil';
import { SIGNIN, SIGNUP, PROFILE, NOTIFICATION, UPDATE_PROFILE} from '../actionTypes/UserConstants';
import { userConstant } from '../constants/Constants';

const history = createBrowserHistory({ forceRefresh: true });

export const SigninUser = (email, password) => (dispatch) => {
  axios.post(userConstant.SIGNIN_URL, { email, password })
    .then((response) => {
      dispatch(asyncActions(SIGNIN).success(response.data));
      document.querySelector('.form_error_text').style.display = 'none';
      if (response.data.status === 'Success') {
        localStorage.setItem('diary_token', response.data.token);
        setAuthToken(response.data.token);
        history.push('/dashboard');
      } else {
        document.querySelector('.form_error_text').style.display = 'block';
        document.querySelector('.form_error_text small').textContent = response.data.message;
      }
    })
    .catch(error => dispatch(asyncActions(SIGNIN)
      .failure(true, error.response.data.message)));
};

export const SignupUser = (email, password, confirmPassword, dateOfBirth, fullName) => (dispatch) => {
  axios.post(userConstant.SIGNUP_URL, { email, password, confirmPassword, dateOfBirth, fullName })
    .then((response) => {
      dispatch(asyncActions(SIGNUP).success(response.data));
      document.querySelector('.form_error_text').style.display = 'none';
      if (response.data.status === 'Success') {
        localStorage.setItem('diary_token', response.data.token);
        setAuthToken(response.data.token);
        history.push('/dashboard');
      } else {
        document.querySelector('.form_error_text').style.display = 'block';
        document.querySelector('.form_error_text small').textContent = response.data.message;
      }
    })
    .catch(error => dispatch(asyncActions(SIGNUP)
      .failure(true, error.response.data.message)));
};

export const ShowProfile = () => (dispatch) => {
  axios.get(userConstant.PROFILE_URL)
    .then((response) => {
      if (response.data.status === 'Success') {
        dispatch(asyncActions(PROFILE).success(response.data.user));
      }
    })
    .catch(error => dispatch(asyncActions(PROFILE)
      .failure(true, error.response.data.message)));
};

export const UpdateProfile = (email, fullName, dateOfBirth) => (dispatch) => {
  axios.put(userConstant.PROFILE_URL, { email, fullName, dateOfBirth })
    .then((response) => {
      if (response.data.status === 'Success') {
        dispatch(asyncActions(UPDATE_PROFILE).success(response.data));
        document.getElementById('loading').style.display = 'none';
        document.querySelector('.form_error_text').style.display = 'none';
        history.push(`/profile?notice=${response.data.message}`);
      }
    })
    .catch(error => dispatch(asyncActions(UPDATE_PROFILE)
      .failure(true, error.response.data.message)));
};

export const SaveNotification = reminderTime => (dispatch) => {
  axios.put(userConstant.NOTIFICATION_URL, { reminderTime })
    .then((response) => {
      if (response.data.status === 'Success') {
        dispatch(asyncActions(NOTIFICATION).success(response.data));
        document.getElementById('loading').style.display = 'none';
        document.getElementById('flash-message').style.display = 'block';
				document.querySelector('#flash-message p').textContent = response.data.message;
      }
    })
    .catch(error => dispatch(asyncActions(NOTIFICATION)
      .failure(true, error.response.data.message)));
};
