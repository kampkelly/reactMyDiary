import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Signin.scss';
import '../../styles/form.scss';
import { SigninUser } from '../../requests/UserRequests';
import { validateForm } from '../../helpers/validateForm';

/**
 * @class Signin
 * @extends {Component}
 */
class Signin extends Component {
  /**
   *Creates an instance of Signin.
   * @memberof Signin
   */
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      success: false
    };
    this.submitSignin = this.submitSignin.bind(this);
    this.change = this.change.bind(this);
    this.goToHome = this.goToHome.bind(this);
  }

  /**
   * @description - This method runs whenever redux state changes
   * @returns {object} state
   * @param {object} props
   * @param {object} state
   * @memberof Header
   */
  static getDerivedStateFromProps(props, state) {
    return {
      failure: props.failure,
      success: props.success,
    };
  }

  change(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  goToHome() {
    this.props.history.push('/signin');
  }

  /**
   *
   *
   * @memberof Signin
   */
  submitSignin(e) {
    const errorMessage = 'One or more of the required fields are empty!';
    const values = { email: this.state.email, password: this.state.password };
    const noneEmpty = validateForm(errorMessage, values, e);
    if (noneEmpty === true) {
      // validation was successful
      const email = this.state.email.toLowerCase().replace(/\s+/g, '');
      const password = this.state.password.toLowerCase();
      this.props.SigninUser(email, password);
      document.querySelector('body').insertAdjacentHTML('afterbegin', `<img src="http://res.cloudinary.com/ddfepbdqg/image/upload/v1543597369/Rolling.svg" id="loading"></img>`);
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <section id="signup">
          <h2 className="text-center white-text">Signin To Your Account</h2>
          <div className="blue-forms form-cover text-center">
            <form className="signin_form" id="signin-form">
              <p className="danger-text form_error_text"><small></small></p>
              <div className="field grid-container">
                <div className="col-2-6 col-6-6-md col-6-6-xs">
                  <label className="white-text">Email Address</label>
                </div>
                <div className="col-4-6 col-6-6-md col-6-6-xs">
                  <input type="email" className="control-form" id="signup_email" name="email" value={email} onChange={this.change} autoComplete="email" />
                </div>
              </div>
              <div className="field grid-container">
                <div className="col-2-6 col-6-6-md col-6-6-xs">
                  <label className="white-text">Password</label>
                </div>
                <div className="col-4-6 col-6-6-md col-6-6-xs">
                  <input type="password" className="control-form" id="signup_password" name="password" value={password} onChange={this.change} autoComplete="password" />
                </div>
              </div>
              <div className="field grid-container">
                <div className="col-2-6 col-6-6-md col-6-6-xs"></div>
                <div className="col-2-6 col-6-6-md col-6-6-xs">
                  <button type="submit" className="submit-button button-white" onClick={this.submitSignin}>Signin</button>
                </div>
                <div className="col-2-6 col-6-6-md col-6-6-xs mt-4-md mt-4-xs">
                  <button type="submit" className="submit-button  button-cancel mt-2-xs" onClick={this.goToHome}>Cancel</button>
                </div>
              </div>
                <div className="field grid-container">
                  <div className="col-2-6 col-6-6-md col-6-6-xs"></div>
                  <div className="col-4-6 col-6-6-md col-6-6-xs">
                    <Link key="1" to="/signup" className="underline">Signup</Link>
                    <Link key="2" to="/forgot/password" className="underline">Forgot password?</Link>
                  </div>
                </div>
            </form>
        </div>
      </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  success: state.user.success
});

Signin.propTypes = {
  SigninUser: PropTypes.func,
  success: PropTypes.bool
};

export default connect(mapStateToProps, {
  SigninUser
})(Signin);
