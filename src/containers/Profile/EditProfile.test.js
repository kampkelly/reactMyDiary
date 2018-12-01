import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import EditProfile from './EditProfile';
import UserReducer from '../../reducers/UserReducer';
import { asyncActions } from '../../util/AsyncUtil';
import { UPDATE_PROFILE } from '../../actionTypes/UserConstants';

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
  updateProfile: jest.fn(),
};

let component;
let myComponent;

describe('<EditProfile/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <EditProfile {...props} />
      </Provider>
    );
    myComponent = component.dive({ context: { store } }).dive();
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
  it('should show profile', () => {
    const payload = {};
    const expectedAction = {
      type: 'UPDATE_PROFILE_SUCCESS',
      payload
    };
    expect(asyncActions(UPDATE_PROFILE).success(payload)).toEqual(expectedAction);
  });
  it('should dispatch an action when updating profile is loading', () => {
    const payload = false;
    const action = {
      type: 'UPDATE_PROFILE_LOADING',
      payload
    };
    const newState = UserReducer({}, action);
    expect(newState).toEqual({
      loading: payload
    });
  });
  it('should dispatch an action to update a profile', () => {
    const payload = {
      message: '',
      user: {}
    };
    const action = {
      type: 'UPDATE_PROFILE_SUCCESS',
      payload
    };
    const newState = UserReducer({}, action);
    expect(newState).toEqual({
      message: action.payload.message,
      user: action.payload.user,
      success: true,
    });
  });
  it('should dispatch an action when updating an entry fails', () => {
    document.body.innerHTML =
    '<div>' +
    '  <span id="loading" />' +
    '  <span class="form_error_text" /><small></small><span>' +
    '  <button id="button" />' +
    '</div>';
    const payload = {};
    const action = {
      type: 'UPDATE_PROFILE_FAILING',
      payload
    };
    const newState = UserReducer({}, action);
    expect(newState).toEqual({});
  });
  it('should update profile', () => {
    document.body.innerHTML =
    '<div>' +
    '  <span id="loading" />' +
    '  <span class="form_error_text" /><small></small><span>' +
    '  <button id="button" />' +
    '</div>';
    const input = myComponent.find('input#fullName');
    input.simulate('change', { target: { value: 'New name' } });
    myComponent.find('button.button-white').simulate('click', {
      preventDefault: () => {
      }
     });
  });
  it('should click cancel button', () => {
    myComponent.find('button.button-cancel').simulate('click');
  });
});
