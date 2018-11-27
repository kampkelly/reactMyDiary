
import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.runAuthentication();
  }

  signOut() {
    this.props.signOut();
    localStorage.removeItem('token');
    history.push('/');
  }

  runAuthentication() {
    if (localStorage.getItem('diary_token')) {
      // authenticated
      document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('a[href="signup.html"]')[0].parentNode.style.display = 'none';
      document.querySelectorAll('a[href="signup.html"]')[1].parentNode.style.display = 'none';
      document.querySelectorAll('a[href="signin.html"]')[0].parentNode.style.display = 'none';
      document.querySelectorAll('a[href="signin.html"]')[1].parentNode.style.display = 'none';
      });
    } else {
      // eslint-disable-next-line
      if (location.href.includes('/signup.html') || location.href.includes('/signin.html') || location.href.includes('/forgot_password.html') || location.href.includes('/about.html')) {
        document.addEventListener('DOMContentLoaded', () => {
        document.querySelector('a[href="#logout"]').style.display = 'none';
        document.querySelectorAll('a[href="dashboard.html"]')[1].parentNode.style.display = 'none';
        document.querySelectorAll('a[href="dashboard.html"]')[3].parentNode.style.display = 'none';
        document.querySelectorAll('a[href="profile.html"]')[0].parentNode.style.display = 'none';
        document.querySelectorAll('a[href="profile.html"]')[1].parentNode.style.display = 'none';
        document.querySelectorAll('a[href="#logout"]')[0].parentNode.style.display = 'none';
        document.querySelectorAll('a[href="#logout"]')[1].parentNode.style.display = 'none';
        });
      } else {
        // window.location = 'signin.html?notice=You are not logged in!&warning=red';
      }
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
                <h1 className="text-center"><a href="dashboard.html" className="white-text">My<span>Diary</span></a></h1>
            </div>
            <div className="col-4-6 col-6-6-xs col-6-6-md">
                    <nav className="desktop">
                        <ul className="no-styling flex">
                            <li className="list-inline"><a href="dashboard.html">Dashboard</a></li>
                            <li className="list-inline"><a href="signup.html">Signup</a></li>
                            <li className="list-inline active"><a href="signin.html">Signin</a></li>
                            <li className="list-inline"><a href="profile.html">My Profile</a></li>
                            <li className="list-inline"><a href="about.html">About</a></li>
                            <li className="list-inline"><a href="#logout" onClick={this.signOut}>Logout</a></li>
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
                                <li><h1 className="text-center"><a href="dashboard.html" className="white-text">My<span>Diary</span></a></h1></li>
                                <li className=""><a href="dashboard.html">Dashboard</a></li>
                                <li className="list-inline"><a href="signup.html">Signup</a></li>
                                <li className="list-inline active"><a href="signin.html">Signin</a></li>
                                <li className=""><a href="profile.html">My Profile</a></li>
                                <li className=""><a href="about.html">About</a></li>
                                <li className=""><a href="#logout">Logout</a></li>
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
