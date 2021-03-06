import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './ViewProfile.scss';
import '../../styles/sidebar.scss';
import { SaveNotification, ShowProfile } from '../../requests/UserRequests';
import { AllEntries } from '../../requests/EntryRequests';
import { validateForm } from '../../helpers/validateForm';
import { checkNotice } from '../../helpers/checkNotice';

/**
 * @class ViewEntry
 * @extends {Component}
 */
class ViewProfile extends Component {
  /**
   *Creates an instance of ViewProfile.
   * @memberof ViewProfile
   */
  constructor() {
    super();
    this.state = {
      diaryEntries: 0,
      editMode: false,
      entry: {},
      mmessage: '',
      reminderTime: '__:__',
      success: false,
      user: {}
    };
    this.change = this.change.bind(this);
    this.changeSettings = this.changeSettings.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }

  change(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    document.querySelector('main').style.backgroundImage = "url('https://i.imgur.com/n4ttyU5.jpg')";
    this.props.ShowProfile();
    this.props.AllEntries();
    checkNotice();
    document.querySelector('body').insertAdjacentHTML('afterbegin', `<img src="http://res.cloudinary.com/ddfepbdqg/image/upload/v1543597369/Rolling.svg" id="loading"></img>`);
  }

  /**
   *
   *
   * @param {*} e
   * @memberof ViewProfile
   */
  changeSettings(e) {
    e.preventDefault();
    document.querySelectorAll('#profile #settings form input[type="time"]')[0].removeAttribute('disabled');
    document.querySelectorAll('#profile #settings form button')[0].removeAttribute('disabled');
    document.querySelectorAll('#profile #settings form input[type="time"]')[0].style.backgroundColor = 'white';
    document.querySelectorAll('#profile #settings form button')[0].style.backgroundColor = '#052F60';
    document.querySelectorAll('#profile #settings form button')[0].style.color = 'white';
    document.querySelectorAll('#profile #settings form button')[0].innerHTML = 'Save';
  }

  /**
   * @description - This method runs whenever redux state changes
   * @returns {object} state
   * @param {object} props
   * @param {object} state
   * @memberof ViewProfile
   */
  static getDerivedStateFromProps(props, state) {
    if (state.editMode) {
      return {
        diaryEntries: props.entries.length,
        user: props.user,
        success: props.success
      };
    }
    if (!state.editMode && props.user.remindertime) {
      return {
        diaryEntries: props.entries.length,
        editMode: true,
        user: props.user,
        reminderTime: props.user.remindertime,
        success: props.success
      };
    }
    return {
      diaryEntries: props.entries.length,
      user: props.user,
      reminderTime: props.user.remindertime,
      success: props.success
    };
  }

  saveSettings(e) {
    e.preventDefault();
    const errorMessage = 'Please Enter a Valid Date!';
    const values = { reminderTime: this.state.reminderTime };
    const noneEmpty = validateForm(errorMessage, values, e);
    if (noneEmpty === true) {
      document.querySelector('body').insertAdjacentHTML('afterbegin', `<img src="http://res.cloudinary.com/ddfepbdqg/image/upload/v1543597369/Rolling.svg" id="loading"></img>`);
      this.props.SaveNotification(this.state.reminderTime);
    }
  }

  /**
   *
   * @returns {jsx} - jsx
   * @memberof ViewProfile
   */
  showProfile() {
    let dateofbirth = '';
    if (this.state.user.dateofbirth && this.state.user.dateofbirth !== ' ') {
			dateofbirth = this.state.user.dateofbirth.split('T')[0];
		}
    if (this.state.user.email) {
      document.getElementById('loading').style.display = 'none';
      const createdat = this.state.user.createdat.split('T')[0];
      return (<div><ul className="no-styling"><li ><strong>Email:</strong>{this.state.user.email}</li><li ><strong>Name:</strong>{this.state.user.fullname}</li><li ><strong>Date of birth:</strong>{dateofbirth}</li><li ><strong>Date Joined:</strong>{createdat}</li></ul>
      <div className=""><Link to="profile/edit" className="underline"><small>Edit Profile</small></Link><p className="light-white-text"><small>Total number of entries in diary: {this.state.diaryEntries}</small></p></div></div>);
    } else {
      return (<p></p>);
    }
  }

  /**
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof ViewProfile
   */
  render() {
    return (
      <div id="profile">
        <h2 className="underline title text-center">My Profile</h2>
	        <div className="grid-container">
							<div className="col-3-6 col-6-6-xs col-6-6-md">
								<section id="profile_details">
		              <h4 className="underline title text-center">Details</h4>
                  {this.showProfile()}
									<div id="insert"></div>
									<p className="danger-text notification_text"><small>Reminder has been set to: <span id="notification_time">{this.state.user.remindertime}</span> every day.</small></p>
		            </section>
							</div>
							<div className="col-3-6 col-6-6-xs col-6-6-md mt-4-md mt-4-xs">
								<section id="settings">
									<div className="text-center">
										<h4 className="underline title text-center">Notification Setting</h4>
										<a href="#" id="change_settings" className="underline" onClick={this.changeSettings}><small>Click here to change notification setting</small></a>
									</div>
                    <div className="grid-container mt-2">
                        <div className="col-6-6 col-6-6-md col-6-6-xs">
                          <form className="signin_form blue-forms form-cover" id="signin-form">
                            <p className="danger-text form_error_text"><small></small></p>
                            <div className="field grid-container">
                              <div className="col-6-6 col-6-6-md col-6-6-xs">
                                  <label className="white-text">Date:</label>
                              </div>
                              <div className="col-6-6 col-6-6-md col-6-6-xs">
                                  <input type="time" required="true" className="control-form" name="reminderTime" id="settngs" placeholder="Enter Date" autoComplete="settings" disabled="true" onChange={this.change} defaultValue={this.state.reminderTime} />
                              </div>
                            </div>
                            <div className="field grid-container">
                              <div className="col-2-6 col-6-6-md col-6-6-xs"></div>
                              <div className="col-6-6 col-6-6-md col-6-6-xs">
                                  <button type="submit" className="submit-button button-white" onClick={this.saveSettings} >Edit</button>
                              </div>
                            </div>
                          </form>
                        </div>
                    </div>
                </section>
						</div>
					</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entries: state.entry.entries,
  user: state.user.user,
  success: state.user.success
});

ViewProfile.propTypes = {
  AllEntries: PropTypes.func,
  SaveNotification: PropTypes.func,
  ShowProfile: PropTypes.func,
  success: PropTypes.bool
};

export default connect(mapStateToProps, {
  AllEntries, SaveNotification, ShowProfile
})(ViewProfile);

