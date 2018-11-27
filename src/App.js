import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Header from './containers/Header/Header';
import Signin from './containers/Signin/Signin';
import Signup from './containers/Signup/Signup';
import Dashboard from './containers/Dashboard/Dashboard';



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
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/signin" exact component={Signin} />
              {/* <Route path="/entries/:id" exact component={OneEntry} /> */}
              <Redirect to="/signin" />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
