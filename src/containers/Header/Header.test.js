import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Header from './Header';

const mockStore = configureMockStore();
const store = mockStore({});

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
  // it('should have a category dropdown', () => {
  //   expect(myComponent.find('div.categories').exists()).toBe(true);
  // });
});
