import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

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
              <Route path="/dashboard" exact component={dashboard} />
              <Redirect to="/signin" />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
