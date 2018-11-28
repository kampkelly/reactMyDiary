import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './EditProfile.scss';
import '../../styles/sidebar.scss';
import { ShowProfile, UpdateProfile } from '../../requests/UserRequests';
import { validateForm } from '../../helpers/validateForm';
import icon from '../../assets/Rolling.svg';

/**
 * @class EditProfile
 * @extends {Component}
 */
class EditProfile extends Component {
  /**
   *Creates an instance of EditProfile.
   * @memberof EditProfile
   */
  constructor() {
    super();
    this.state = {
      dateOfBirth: '',
      email: '',
      fullName: '',
      mmessage: '',
      success: false,
      user: {}
    };
    this.change = this.change.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  change(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  componentDidMount() {
    this.props.ShowProfile();
    document.querySelector('body').insertAdjacentHTML('afterbegin', `<img src=${icon} id="loading"></img>`);
  }

  /**
   * @description - This method runs whenever redux state changes
   * @returns {object} state
   * @param {object} props
   * @param {object} state
   * @memberof EditProfile
   */
  static getDerivedStateFromProps(props, state) {
    if (props.user.email) {
      document.getElementById('loading').style.display = 'none';
    }
    return {
      dateOfBirth: props.user.dateofbirth,
      email: props.user.email,
      fullName: props.user.fullname,
      user: props.user,
      success: props.success
    };
  }

  /**
   *
   * @returns {object} state
   * @memberof EditProfile
   */
  updateProfile(e) {
    e.preventDefault();
    const { dateOfBirth, email, fullName } = this.state;
    this.props.UpdateProfile(email, fullName, dateOfBirth);
    document.querySelector('body').insertAdjacentHTML('afterbegin', `<img src=${icon} id="loading"></img>`);
  }

  /**
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof EditProfile
   */
  render() {
    const { dateOfBirth, email, fullName } = this.state;
    return (
      <div id="edit-profile">
         <div className="blue-forms form-cover text-center">
            <h3 className="underline title text-center">Edit My Profile</h3>
            <form className="edit-profile-form" id="edit-profile-form">
              <p className="danger-text form_error_text"><small></small></p>
              <p className="success-text form_success_text"><small></small></p>
              <div className="field grid-container">
                <div className="col-2-6 col-6-6-md col-6-6-xs">
                  <label className="">Full Name:</label>
                </div>
                <div className="col-4-6 col-6-6-md col-6-6-xs">
                  <input type="text" required="true" className="control-form" id="signup_fullname" autoComplete="name" name="fullName" onChange={this.change} defaultValue={fullName} />
                </div>
              </div>
              <div className="field grid-container">
                <div className="col-2-6 col-6-6-md col-6-6-xs">
                  <label className="">Email Address:</label>
                </div>
                <div className="col-4-6 col-6-6-md col-6-6-xs">
                  <input type="email" required="true" className="control-form" id="signup_email" autoComplete="email" name="email" onChange={this.change} defaultValue={email} />
                </div>
              </div>
              <div className="field grid-container">
                <div className="col-2-6 col-6-6-md col-6-6-xs">
                  <label className="">Date of Birth:</label>
                </div>
                <div className="col-4-6 col-6-6-md col-6-6-xs">
                  <input type="date" className="control-form" id="signup_username" autoComplete="date" name="dateOfBirth" onChange={this.change} defaultValue={dateOfBirth} pattern="[a-z|A-Z|\d]{1,15}" />
                </div>
              </div>
              <div className="field grid-container">
                <div className="col-2-6 col-6-6-md col-6-6-xs"></div>
                <div className="col-2-6 col-6-6-md col-6-6-xs">
                  <button type="submit" className="submit-button button-white" onClick={this.updateProfile}>Update Profile</button>
                </div>
                <div className="col-2-6 col-6-6-md col-6-6-xs cancel-div">
                  <button type="submit" className="submit-button  button-cancel mt-4-xs mt-4-md">Cancel</button>
                </div>
                <div className="col-3-6 col-6-6-md col-6-6-xs">

                </div>
              </div>
            </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  success: state.user.success
});

EditProfile.propTypes = {
  ShowProfile: PropTypes.func,
  UpdateProfile: PropTypes.func,
  success: PropTypes.bool
};

export default connect(mapStateToProps, {
  ShowProfile, UpdateProfile
})(EditProfile);

