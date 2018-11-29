
import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Header.scss';
import { SIGNOUT } from '../../actionTypes/UserConstants';
import { asyncActions } from '../../util/AsyncUtil';

const history = createBrowserHistory({ forceRefresh: true });

/**
 * @class Header
 * @extends {Component}
 */
class Header extends Component {
  /**
   *Creates an instance of Header.
   * @memberof Header
   */
  constructor() {
    super();
    this.state = {
      showOnloggedIn: '',
      showOnloggedOut: ''
    };
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.runAuthentication();
  }

  signOut(e) {
    e.preventDefault();
    this.props.signOut();
    localStorage.removeItem('diary_token');
    history.push('/signin');
  }

  runAuthentication() {
    if (localStorage.getItem('diary_token')) {
      // authenticated
      this.setState({ showOnloggedIn: '' });
      this.setState({ showOnloggedOut: 'hide-all' });
    } else {
      this.setState({ showOnloggedIn: 'hide-all' });
      this.setState({ showOnloggedOut: '' });
      // window.location = 'signin.html?notice=You are not logged in!&warning=red';
    }
  }

  /**
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof Header
   */
  render() {
    return (
      <div>
        <header>
        <div className="container grid-container">
            <div className="col-2-6 col-6-6-xs col-6-6-md">
                <h1 className="text-center"><Link to="/dashboard" className="white-text">My<span>Diary</span></Link></h1>
            </div>
            <div className="col-4-6 col-6-6-xs col-6-6-md">
                    <nav className="desktop">
                        <ul className="no-styling flex">
                            <li className={`list-inline ${this.state.showOnloggedIn}`}><Link to="/dashboard">Dashboard</Link></li>
                            <li className={`list-inline ${this.state.showOnloggedOut}`}><Link to ="/signup">Signup</Link></li>
                            <li className={`list-inline active ${this.state.showOnloggedOut}`}><Link to="/signin">Signin</Link></li>
                            <li className={`list-inline ${this.state.showOnloggedIn}`}><Link to="/profile">My Profile</Link> </li>
                            <li className="list-inline"><Link to="/about">About</Link></li>
                            <li className={`list-inline ${this.state.showOnloggedIn}`}><a href="#logout" onClick={this.signOut}>Logout</a></li>
                        </ul>
                    </nav>
                    <nav className="mobile">
                        <div className="menu-button" id="menu-button">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div>
                            <ul className="no-styling flex text-center">
                                <span className="menu-button-close" id="menu-button-close">X</span>
                                <li><h1 className="text-center"><Link to="/dashboard" className="white-text">My<span>Diary</span></Link></h1></li>
                                <li className={`list-inline ${this.state.showOnloggedIn}`}><Link to="/dashboard">Dashboard</Link></li>
                                <li className={`list-inline ${this.state.showOnloggedOut}`}><Link to ="/signup">Signup</Link></li>
                                <li className={`list-inline ${this.state.showOnloggedOut}`}><Link to="/signin">Signin</Link></li>
                                <li className={`list-inline ${this.state.showOnloggedIn}`}><Link to="/profile">My Profile</Link> </li>
                                <li className="list-inline"><Link to="/about">About</Link></li>
                                <li className={`list-inline ${this.state.showOnloggedIn}`}><a href="#logout" onClick={this.signOut}>Logout</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  signOut: PropTypes.func
};

const mapStateToProps = state => ({});


export default connect(mapStateToProps, {
  signOut: asyncActions(SIGNOUT).success,
})(Header);
