import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Header from './containers/Header/Header';
import Signin from './containers/Signin/Signin';
import Signup from './containers/Signup/Signup';
import Dashboard from './containers/Dashboard/Dashboard';
import NewEntry from './containers/Entry/NewEntry';
import ViewEntry from './containers/Entry/ViewEntry';
import UpdateEntry from './containers/Entry/UpdateEntry';
import ViewProfile from './containers/Profile/ViewProfile';
import EditProfile from './containers/Profile/EditProfile';
import { About } from './components/About/About';



/**
 * @class App
 * @extends {Component}
 */
class App extends Component {
  constructor() {
    super();
    this.closeNotification = this.closeNotification.bind(this);
  }

  /**
   *
   * @returns {func} - null
   * @memberof App
   */
  closeNotification() {
    document.querySelector('#flash-message').style.display = 'none';
  }
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
              <span onClick={this.closeNotification}>X</span>
              <p></p>
            </div>
            <Switch>
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/signin" exact component={Signin} />
              <PrivateRoute path="/entry/new" component={NewEntry} />
              <PrivateRoute exact path="/entries/:id" component={ViewEntry} />
              <PrivateRoute exact path="/entries/:id/update" component={UpdateEntry} />
              <PrivateRoute exact path="/profile" component={ViewProfile} />
              <PrivateRoute exact path="/profile/edit" component={EditProfile} />
              <Route exact path="/about" component={About} />
              <Redirect to="/dashboard" />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
