import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Signup from './Signup';
import UserReducer from '../../reducers/UserReducer';
import { asyncActions } from '../../util/AsyncUtil';
import { SIGNUP } from '../../actionTypes/UserConstants';
import setAuthToken from '../../util/AuthTokenUtil';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  user: {
    user: {},
    message: '',
    success: false
  },
  email: 'email@example.com',
  fullName: 'full name',
  password: 'password',
  confirmPassword: 'password',
  entry: {
    entries: []
  }
});

const props = {
  history: {
    push: jest.fn()
  },
  submitSignup: jest.fn(),
  SignupUser: jest.fn(),
};

let component;
let myComponent;

describe('<Signup/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <Signup {...props} />
      </Provider>
    );
    document.body.innerHTML =
    '<main></main>';
    myComponent = component.dive({ context: { store } }).dive();
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
  it('should show profile', () => {
    const payload = {};
    const expectedAction = {
      type: 'SIGNUP_SUCCESS',
      payload
    };
    expect(asyncActions(SIGNUP).success(payload)).toEqual(expectedAction);
  });
  it('should dispatch an action when signin is loading', () => {
    const payload = false;
    const action = {
      type: 'SIGNUP_LOADING',
      payload
    };
    const newState = UserReducer({}, action);
    expect(newState).toEqual({
      loading: payload
    });
  });
  it('should dispatch an action to signin a user', () => {
    const payload = true;
    const action = {
      type: 'SIGNUP_SUCCESS',
      payload
    };
    const newState = UserReducer({}, action);
    expect(newState).toEqual({
      success: action.payload,
    });
  });
  it('should dispatch an action when signin a user fails', () => {
    document.body.innerHTML =
    '<div>' +
    '  <span id="loading" />' +
    '  <span class="form_error_text" /><small></small><span>' +
    '  <button id="button" />' +
    '</div>';
    const payload = {};
    const action = {
      type: 'SIGNUP_FAILING',
      payload
    };
    const newState = UserReducer({}, action);
    expect(newState).toEqual({});
  });
  it('should signin user', () => {
    document.body.innerHTML =
    '<div>' +
    '  <span id="loading" />' +
    '  <span class="form_error_text" /><small></small><span>' +
    '  <button id="button" />' +
    '</div>';
    const emailInput = myComponent.find('input[name="email"]');
    const fullNameInput = myComponent.find('input[name="fullName"]');
    const passwordInput = myComponent.find('input[name="password"]');
    const confirmPasswordInput = myComponent.find('input[name="confirmPassword"]');
    emailInput.simulate('change', { target: { value: 'email@example.com' } });
    fullNameInput.simulate('change', { target: { value: 'full name' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    confirmPasswordInput.simulate('change', { target: { value: 'password' } });
    myComponent.find('button.button-white').simulate('click', {
      preventDefault: () => {
      }
     });
  });
  it('should click cancel button', () => {
    myComponent.find('button.button-cancel').simulate('click');
  });
  it('calls the signup user function', () => {
    setAuthToken('fffnf');
    setAuthToken('');
  });
});
