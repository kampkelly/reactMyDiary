import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import UpdateEntry from './UpdateEntry';
import EntryReducer from '../../reducers/EntryReducer';
import { asyncActions } from '../../util/AsyncUtil';
import { UPDATE_ENTRY } from '../../actionTypes/EntryConstants';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  entry: {
    entry: {},
    message: '',
    success: false
  }
});

const props = {
  history: {
    push: jest.fn()
  },
  match: {
    params: {
      id: 1
    }
  },
  ShowEntry: jest.fn()
};

let component;
let myComponent;

describe('<UpdateEntry/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <UpdateEntry {...props} />
      </Provider>
    );
    document.body.innerHTML =
    '<main></main>';
    myComponent = component.dive({ context: { store } }).dive();
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
  it('should show update entry', () => {
    const payload = true;
    const expectedAction = {
      type: 'UPDATE_ENTRY_SUCCESS',
      payload
    };
    expect(asyncActions(UPDATE_ENTRY).success(payload)).toEqual(expectedAction);
  });
  it('should dispatch an action when updating an entry is loading', () => {
    const payload = false;
    const action = {
      type: 'UPDATE_ENTRY_LOADING',
      payload
    };
    const newState = EntryReducer({}, action);
    expect(newState).toEqual({
      loading: payload
    });
  });
  it('should dispatch an action to update an entry', () => {
    const payload = {};
    const action = {
      type: 'UPDATE_ENTRY_SUCCESS',
      payload
    };
    const newState = EntryReducer({}, action);
    expect(newState).toEqual({
      entry: {},
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
    const payload = {
      error: ''
    };
    const action = {
      type: 'UPDATE_ENTRY_FAILING',
      payload
    };
    const newState = EntryReducer({}, action);
    expect(newState).toEqual({
      message: payload.error
    });
  });
  it('should click submit button', () => {
    document.body.innerHTML =
    '<body>' +
    '  <span id="loading" />' +
    '  <span class="form_error_text" /><small></small><span>' +
    '  <button id="button" />' +
    '</body>';
    const input = myComponent.find('input#title');
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
