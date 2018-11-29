import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Signup.scss';
import '../../styles/form.scss';
import { SignupUser } from '../../requests/UserRequests';
import { validateForm } from '../../helpers/validateForm';


/**
 * @class Signup
 * @extends {Component}
 */
class Signup extends Component {
  /**
   *Creates an instance of Signin.
   * @memberof Signin
   */
  constructor() {
    super();
    this.state = {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
      success: false
    };
    this.submitSignup = this.submitSignup.bind(this);
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

  goToHome() {
    this.props.history.push('/signup');
  }

  /**
   *
   *
   * @memberof Signup
   */
  submitSignup(e) {
    const errorMessage = 'One or more of the required fields are empty!';
    const values = { email: this.state.email, fullName: this.state.fullName, password: this.state.password, confirmPassword: this.state.confirmPassword };
    const noneEmpty = validateForm(errorMessage, values, e);
    if (noneEmpty === true) {
      // validation was successful
      const email = this.state.email.toLowerCase().replace(/\s+/g, '');
      const password = this.state.password.toLowerCase();
      const confirmPassword = this.state.confirmPassword.toLowerCase();
      this.props.SignupUser(email, password, confirmPassword, this.state.dateOfBirth, this.state.fullName);
    }
  }

  change(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  /**
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof Signup
   */
  render() {
    const { email, password, confirmPassword, dateOfBirth, fullName } = this.state;
    return (
      <div>
        <section id="signup">
          <h1 className="white-text text-center">Welcome to MyDiary</h1>
          <h5 className="white-text text-center">Keep your personal thoughts safe...</h5>
          <h2 className="text-center white-text">Create An Account</h2>
            <div className="blue-forms form-cover text-center">
              <form className="signup_form" id="signup-form">
                <p className="danger-text form_error_text"><small></small></p>
                <div className="field grid-container">
                  <div className="col-2-6 col-6-6-md col-6-6-xs">
                    <label className="white-text">Full Name:</label>
                  </div>
                  <div className="col-4-6 col-6-6-md col-6-6-xs">
                    <input type="text" required="true" className="control-form" id="fullname" name="fullName" value={fullName} onChange={this.change} autoComplete="fullName" />
                  </div>
                </div>
                <div className="field grid-container">
                  <div className="col-2-6 col-6-6-md col-6-6-xs">
                    <label className="white-text">Email Address</label>
                  </div>
                  <div className="col-4-6 col-6-6-md col-6-6-xs">
                    <input type="email" required="true" className="control-form" id="email" name="email" value={email} onChange={this.change} autoComplete="email" />
                  </div>
                </div>
                <div className="field grid-container">
                  <div className="col-2-6 col-6-6-md col-6-6-xs">
                    <label className="white-text">Date of Birth</label>
                  </div>
                  <div className="col-4-6 col-6-6-md col-6-6-xs">
                    <input type="date" className="control-form" id="dateOfBirth" name="dateOfBirth" value={dateOfBirth} onChange={this.change} autoComplete="dateOfBirth" max="2000-01-01" pattern="[a-z|A-Z|\d]{1,15}" />
                  </div>
                </div>
                <div className="field grid-container">
                  <div className="col-2-6 col-6-6-md col-6-6-xs">
                    <label className="white-text">Password</label>
                  </div>
                  <div className="col-4-6 col-6-6-md col-6-6-xs">
                    <input type="password" required="true" className="control-form" id="password" name="password" value={password} onChange={this.change} autoComplete="password" />
                  </div>
                </div>
                <div className="field grid-container">
                  <div className="col-2-6 col-6-6-md col-6-6-xs">
                      <label className="white-text">Confirm Password</label>
                  </div>
                  <div className="col-4-6 col-6-6-md col-6-6-xs">
                      <input type="password" required="true" className="control-form" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={this.change} autoComplete="confirmPassword" />
                  </div>
                </div>
                <div className="field grid-container">
                  <div className="col-2-6 col-6-6-md col-6-6-xs"></div>
                  <div className="col-2-6 col-6-6-md col-6-6-xs">
                    <button type="submit" className="submit-button button-white" id="dkkd" onClick={this.submitSignup}>Create Account</button>
                  </div>
                  <div className="col-2-6 col-6-6-md col-6-6-xs mt-4-md mt-4-xs">
                    <button type="submit" className="submit-button button-cancel" onClick={this.goToHome}>Cancel</button>
                  </div>
                </div>
                <div className="field grid-container">
                  <div className="col-2-6 col-6-6-md col-6-6-xs"></div>
                  <div className="col-4-6 col-6-6-md col-6-6-xs">
                    <span className="white-text">Already have an account?</span> <a href="signin.html" className="underline">Signin</a>
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

Signup.propTypes = {
  SignupUser: PropTypes.func,
  success: PropTypes.bool
};

export default connect(mapStateToProps, {
  SignupUser
})(Signup);
