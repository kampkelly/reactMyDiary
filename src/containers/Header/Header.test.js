import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Header from './Header';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  signOut: jest.fn(),
});

let component;
let myComponent;

describe('<Header/>', () => {
  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    myComponent = component.dive({ context: { store } }).dive();
  });
  it('should render without throwing an error', () => {
    expect(component).toMatchSnapshot();
  });
  it('should have a desktop class', () => {
    expect(myComponent.find('.desktop').exists()).toBe(true);
  });
  it('should have a mobile class', () => {
    expect(myComponent.find('.mobile').exists()).toBe(true);
  });
  it('should have signout function', () => {
    expect(myComponent.instance().signOut).toBeDefined();
  });
  it('should have showOnloggedIn state as string', () => {
    expect(myComponent.instance().state.showOnloggedIn).toEqual('hide-all');
  });
  it('should have showOnloggedOut state as string', () => {
    expect(myComponent.instance().state.showOnloggedOut).toEqual('');
  });
  it('should click sign out', () => {
    // const mockCallBack = jest.fn();
    myComponent.find('.mobile-logout a[href="#logout"]').simulate('click', {
      preventDefault: () => {
      }
     });
    // expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
