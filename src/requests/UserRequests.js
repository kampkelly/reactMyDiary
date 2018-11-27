import axios from 'axios';
import { createBrowserHistory } from 'history';

import setAuthToken from '../util/AuthTokenUtil';
import { asyncActions } from '../util/AsyncUtil';
import { SIGNIN, SIGNUP } from '../actionTypes/UserConstants';
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
        history.push('/signin');
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
        history.push('/signin');
      } else {
        document.querySelector('.form_error_text').style.display = 'block';
        document.querySelector('.form_error_text small').textContent = response.data.message;
      }
    })
    .catch(error => dispatch(asyncActions(SIGNUP)
      .failure(true, error.response.data.message)));
};
