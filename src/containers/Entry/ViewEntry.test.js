import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import ViewEntry from './ViewEntry';
import EntryReducer from '../../reducers/EntryReducer';
import { asyncActions } from '../../util/AsyncUtil';
import { SHOW_ENTRY, ALL_ENTRIES } from '../../actionTypes/EntryConstants';
import { ShowEntry, AllEntries } from '../../requests/EntryRequests';
import { entryConstant } from '../../constants/Constants';

const mock = new MockAdapter(axios);
const BASE_URL = 'https://kampkelly-mydiary-api.herokuapp.com/api/v1';
const entries = [];
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  entries: [],
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
  afterEach(() => {
    mock.reset();
  });
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
  it('Get entry is successful', () => {
    mock.onGet(entryConstant.ENTRIES_URL).reply(200, {
      entries,
      message: '',
      status: 'success',
    });

    const mockedActions = [
      {
        type: `${ALL_ENTRIES}_LOADING`,
        payload: false,
      },
      {
        type: `${ALL_ENTRIES}_SUCCESS`,
        payload: [],
      },
      {
        type: `${ALL_ENTRIES}_LOADING`,
        payload: true
      }
    ];

    const store = mockStore({ entries: [] });
    return store.dispatch(AllEntries()).then(() => {
      expect(store.getActions()).toEqual(mockedActions);
    });
  });

  it('Get one entry is successful', () => {
    mock.onGet(`${entryConstant.ENTRIES_URL}/1`).reply(200, {
      entry: {},
      message: '',
      status: 'Success',
    });

    const mockedActions = [
      {
        type: `${SHOW_ENTRY}_LOADING`,
        payload: false,
      },
      {
        type: `${SHOW_ENTRY}_SUCCESS`,
        payload: {},
      },
      {
        type: `${SHOW_ENTRY}_LOADING`,
        payload: true
      }
    ];

    const store = mockStore({ entry: {} });
    return store.dispatch(ShowEntry(1)).then(() => {
      expect(store.getActions()).toEqual(mockedActions);
    });
  });
});
