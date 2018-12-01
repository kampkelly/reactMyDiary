import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ViewEntry from './ViewEntry';
import EntryReducer from '../../reducers/EntryReducer';
import { asyncActions } from '../../util/AsyncUtil';
import { SHOW_ENTRY } from '../../actionTypes/EntryConstants';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  entry: {
    entry: {
      createdat: '',
      description: 'the description',
      id: 1,
      title: 'the title'
    },
    message: '',
    success: true
  },
  ShowEntry: jest.fn()
});

const props = {
  match: {
    params: {
      id: 1
    }
  },
  ShowEntry: jest.fn()
};

let component;
let myComponent;

describe('<ViewEntry/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <ViewEntry {...props} />
      </Provider>
    );
    document.body.innerHTML =
    '<body><main></main>' +
    '  <span id="loading" />' +
    '  <span class="form_error_text" /><small></small><span>' +
    '  <button id="button" />' +
    '</body>';
    myComponent = component.dive({ context: { store } }).dive();
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
  it('should show a new entry', () => {
    const payload = true;
    const expectedAction = {
      type: 'SHOW_ENTRY_SUCCESS',
      payload
    };
    expect(asyncActions(SHOW_ENTRY).success(payload)).toEqual(expectedAction);
  });
  it('should dispatch an action when getting an entry is loading', () => {
    const payload = false;
    const action = {
      type: 'SHOW_ENTRY_LOADING',
      payload
    };
    const newState = EntryReducer({}, action);
    expect(newState).toEqual({
      loading: payload
    });
  });
  it('should dispatch an action to get an entry', () => {
    const payload = {};
    const action = {
      type: 'SHOW_ENTRY_SUCCESS',
      payload
    };
    const newState = EntryReducer({}, action);
    expect(newState).toEqual({
      entry: payload,
      success: true,
    });
  });
  it('should dispatch an action when getting an entry fails', () => {
    const payload = {
      error: ''
    };
    const action = {
      type: 'SHOW_ENTRY_FAILING',
      payload
    };
    const newState = EntryReducer({}, action);
    expect(newState).toEqual({
      message: payload.error
    });
  });
  //extra
  it('should dispatch an action when getting all entries is loading', () => {
    const payload = false;
    const action = {
      type: 'ALL_ENTRIES_LOADING',
      payload
    };
    const newState = EntryReducer({}, action);
    expect(newState).toEqual({
      loading: payload
    });
  });
  it('should dispatch an action to get all entries', () => {
    const payload = [];
    const action = {
      type: 'ALL_ENTRIES_SUCCESS',
      payload
    };
    const newState = EntryReducer({}, action);
    expect(newState).toEqual({
      entries: payload,
      success: true,
    });
  });
  it('should dispatch an action when getting all entries fails', () => {
    const payload = {};
    const action = {
      type: 'ALL_ENTRIES_FAILING',
      payload
    };
    const newState = EntryReducer({}, action);
    expect(newState).toEqual({});
  });
  it('should dispatch an action when getting all entries is loading', () => {
    const payload = false;
    const action = {
      type: 'PAGINATED_ENTRIES_LOADING',
      payload
    };
    const newState = EntryReducer({}, action);
    expect(newState).toEqual({
      loading: payload
    });
  });
  it('should dispatch an action to get all entries', () => {
    const payload = [];
    const action = {
      type: 'PAGINATED_ENTRIES_SUCCESS',
      payload
    };
    const newState = EntryReducer({}, action);
    expect(newState).toEqual({
      paginatedEntries: payload,
      success: true,
    });
  });
  it('should dispatch an action when getting all entries fails', () => {
    const payload = {};
    const action = {
      type: 'PAGINATED_ENTRIES_FAILING',
      payload
    };
    const newState = EntryReducer({}, action);
    expect(newState).toEqual({});
  });
});
