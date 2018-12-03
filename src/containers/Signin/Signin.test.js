import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Signin from './Signin';
import UserReducer from '../../reducers/UserReducer';
import { asyncActions } from '../../util/AsyncUtil';
import { SIGNIN } from '../../actionTypes/UserConstants';
import { SigninUser } from '../../requests/UserRequests';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  user: {
    user: {},
    message: '',
    success: false
  },
  entry: {
    entries: []
  }
});

const props = {
  history: {
    push: jest.fn()
  },
  submitSignin: jest.fn(),
};

let component;
let myComponent;

describe('<Signin/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <Signin {...props} />
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
      type: 'SIGNIN_SUCCESS',
      payload
    };
    expect(asyncActions(SIGNIN).success(payload)).toEqual(expectedAction);
  });
  it('should dispatch an action when signin is loading', () => {
    const payload = false;
    const action = {
      type: 'SIGNIN_LOADING',
      payload
    };
    const newState = UserReducer({}, action);
    expect(newState).toEqual({
      loading: payload
    });
  });
  it('should dispatch an action to signin a user', () => {
    const payload = {
      message: '',
      user: {}
    };
    const action = {
      type: 'SIGNIN_SUCCESS',
      payload
    };
    const newState = UserReducer({}, action);
    expect(newState).toEqual({
      isAuth: true,
      success: true,
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
      type: 'SIGNIN_FAILING',
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
    const input = myComponent.find('input[name="email"]');
    input.simulate('change', { target: { value: 'email@example.com' } });
    myComponent.find('button.button-white').simulate('click', {
      preventDefault: () => {
      }
     });
  });
  it('should click cancel button', () => {
    myComponent.find('button.button-cancel').simulate('click');
  });
});
