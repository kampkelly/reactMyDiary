import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Header from './containers/Header/Header';
import Signin from './containers/Signin/Signin';
import Signup from './containers/Signup/Signup';
import NewEntry from './containers/Entry/NewEntry';
import ViewEntry from './containers/Entry/ViewEntry';



/**
 * @class App
 * @extends {Component}
 */
class App extends Component {
  /**
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof App
   */
  render() {
    return (
      <div>
        <Header />
        <main>
          <div className="main container">
            <div id="flash-message">
              <span>X</span>
              <p></p>
            </div>
            <Switch>
              <Route path="/signup" exact component={Signup} />
              <Route path="/signin" exact component={Signin} />
              <PrivateRoute path="/entry/new" component={NewEntry} />
              <PrivateRoute exact path="/entries/:id" component={ViewEntry} />
              <Redirect to="/signin" />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
