import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ViewProfile from './ViewProfile';
import UserReducer from '../../reducers/UserReducer';
import { asyncActions } from '../../util/AsyncUtil';
import { PROFILE } from '../../actionTypes/UserConstants';

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
  checkNotice: jest.fn(),
  changeSettings: jest.fn(),
  saveSettings: jest.fn(),
  showProfile: jest.fn()
};

let component;
let myComponent;

describe('<ViewProfile/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <ViewProfile {...props} />
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
      type: 'PROFILE_SUCCESS',
      payload
    };
    expect(asyncActions(PROFILE).success(payload)).toEqual(expectedAction);
  });
  it('should dispatch an action when showing profile is loading', () => {
    const payload = false;
    const action = {
      type: 'PROFILE_LOADING',
      payload
    };
    const newState = UserReducer({}, action);
    expect(newState).toEqual({
      loading: payload
    });
  });
  it('should dispatch an action to show a profile', () => {
    const payload = {};
    const action = {
      type: 'PROFILE_SUCCESS',
      payload
    };
    const newState = UserReducer({}, action);
    expect(newState).toEqual({
      user: action.payload,
      success: true,
    });
  });
  it('should dispatch an action when updating an entry fails', () => {
    const payload = {};
    const action = {
      type: 'PROFILE_FAILING',
      payload
    };
    const newState = UserReducer({}, action);
    expect(newState).toEqual({});
  });
  it('should dispatch an action when notification is loading', () => {
    const payload = false;
    const action = {
      type: 'NOTIFICATION_LOADING',
      payload
    };
    const newState = UserReducer({}, action);
    expect(newState).toEqual({
      loading: payload
    });
  });
  it('should dispatch an action to update notification', () => {
    const payload = {
      message: '',
      user: {}
    };
    const action = {
      type: 'NOTIFICATION_SUCCESS',
      payload
    };
    const newState = UserReducer({}, action);
    expect(newState).toEqual({
      message: action.payload.message,
      user: action.payload.user,
      success: true,
    });
  });
  it('should dispatch an action when notification update fails', () => {
    const payload = {};
    const action = {
      type: 'NOTIFICATION_FAILING',
      payload
    };
    const newState = UserReducer({}, action);
    expect(newState).toEqual({});
  });
  it('should click change settings link', () => {
    document.body.innerHTML = `
    <div id="profile">
      <section id="settings">
        <form>
          <input type="time" required="true" className="control-form" name="reminderTime" id="settngs" placeholder="Enter Date" autoComplete="settings" disabled="true" />
          <button type="submit" className="submit-button button-white" >Edit</button>
        </form>
      </section>
    </div>
    `;
    myComponent.find('a#change_settings').simulate('click', {
      preventDefault: () => {
      }
     });
  });
  it('should save settings', () => {
    document.body.innerHTML =
    '<div>' +
    '  <span id="loading" />' +
    '  <span class="form_error_text" /><small></small><span>' +
    '  <button id="button" />' +
    '</div>';
    const input = myComponent.find('input#settngs');
    input.simulate('change', { target: { value: '10:00' } });
    myComponent.find('button.button-white').simulate('click', {
      preventDefault: () => {
      }
     });
  });
});
