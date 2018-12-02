import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import NewEntry from './NewEntry';
import EntryReducer from '../../reducers/EntryReducer';
import { asyncActions } from '../../util/AsyncUtil';
import { NEW_ENTRY } from '../../actionTypes/EntryConstants';
import { AddEntry } from '../../requests/EntryRequests'
import { entryConstant } from '../../constants/Constants';

const mock = new MockAdapter(axios);
const entry = { title: 'the new title yeah', description: 'the description is now active in this file' };
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
  addEntry: jest.fn()
};

let component;
let myComponent;

describe('<NewEntry/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <NewEntry {...props} />
      </Provider>
    );
    document.body.innerHTML =
    '<main></main>';
    myComponent = component.dive({ context: { store } }).dive();
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
  it('should show new entry', () => {
    const payload = {};
    const expectedAction = {
      type: 'NEW_ENTRY_SUCCESS',
      payload
    };
    expect(asyncActions(NEW_ENTRY).success(payload)).toEqual(expectedAction);
  });
  it('should dispatch an action when create an entry is loading', () => {
    const payload = false;
    const action = {
      type: 'NEW_ENTRY_LOADING',
      payload
    };
    const newState = EntryReducer({}, action);
    expect(newState).toEqual({
      loading: payload
    });
  });
  it('should dispatch an action to create an entry', () => {
    const payload = true;
    const action = {
      type: 'NEW_ENTRY_SUCCESS',
      payload
    };
    const newState = EntryReducer({}, action);
    expect(newState).toEqual({
      success: action.payload,
    });
  });
  it('should dispatch an action when creating an entry fails', () => {
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
      type: 'NEW_ENTRY_FAILING',
      payload
    };
    const newState = EntryReducer({}, action);
    expect(newState).toEqual({});
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

  it('Create an entry is successful', () => {
    document.body.innerHTML =
    '<div>' +
    '  <span id="loading" />' +
    '  <span class="form_error_text" /><small></small><span>' +
    '  <button id="button" />' +
    '</div>';
    mock.onPost(entryConstant.ENTRIES_URL).reply(201, {
      entry: { id: 1 },
      status: 'Success',
      success: true,
    });

    const mockedActions = [
      {
        type: `${NEW_ENTRY}_LOADING`,
        payload: false,
      },
      {
        type: `${NEW_ENTRY}_SUCCESS`,
        payload: true,
      },
      {
        type: `${NEW_ENTRY}_LOADING`,
        payload: true
      }
    ];

    const store = mockStore({ success: false });
    return store.dispatch(AddEntry(entry.title, entry.description)).then(() => {
      expect(store.getActions()).toEqual(mockedActions);
    });
  });
});
