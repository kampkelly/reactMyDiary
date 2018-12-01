import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import NewEntry from './NewEntry';
import EntryReducer from '../../reducers/EntryReducer';
import { asyncActions } from '../../util/AsyncUtil';
import { NEW_ENTRY } from '../../actionTypes/EntryConstants';

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
