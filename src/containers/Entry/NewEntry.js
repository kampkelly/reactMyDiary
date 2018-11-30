import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './NewEntry.scss';
import '../../styles/form.scss';
import '../../styles/sidebar.scss';
import { AddEntry } from '../../requests/EntryRequests';
import { validateForm } from '../../helpers/validateForm';

/**
 * @class NewEntry
 * @extends {Component}
 */
class NewEntry extends Component {
  /**
   *Creates an instance of NewEntry.
   * @memberof NewEntry
   */
  constructor() {
    super();
    this.state = {
      entry: {},
      title: '',
      description: '',
      success: false
    };
    this.addEntry = this.addEntry.bind(this);
    this.change = this.change.bind(this);
    this.goToHome = this.goToHome.bind(this);
  }

  /**
   *
   * @returns {jsx} - jsx
   * @memberof NewEntry
   */
  addEntry(e) {
    const errorMessage = 'One or more of the required fields are empty!';
    const values = { title: this.state.title, description: this.state.description };
    const noneEmpty = validateForm(errorMessage, values, e);
    if (noneEmpty === true) {
      document.querySelector('body').insertAdjacentHTML('afterbegin', `<img src="http://res.cloudinary.com/ddfepbdqg/image/upload/v1543597369/Rolling.svg" id="loading"></img>`);
      this.props.AddEntry(this.state.title, this.state.description);
    }
  }

  change(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  goToHome() {
    this.props.history.push('/dashboard');
  }

  /**
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof Header
   */
  render() {
    const { title, description } = this.state;
    return (
      <div>
        <section id="add">
          <div className="blue-forms form-cover text-center">
            <form className="add_form" id="add-form">
              <h3 className="title text-center white-text">What is happening today?</h3>
              <p className="danger-text form_error_text"><small></small></p>
              <p className="success-text form_success_text"><small></small></p>
              <div className="field grid-container">
                <div className="col-2-6 col-6-6-md col-6-6-xs">
                  <label className="white-text">Title:</label>
                </div>
                <div className="col-4-6 col-6-6-md col-6-6-xs">
                  <input type="text" required="true" className="control-form" id="title" name="title" value={title} onChange={this.change} autoComplete="title" />
                </div>
              </div>
              <div className="field grid-container">
                <div className="col-2-6 col-6-6-md col-6-6-xs">
                  <label className="white-text">Description:</label>
                </div>
                <div className="col-4-6 col-6-6-md col-6-6-xs">
                  <textarea className="control-form" id="description" required="true" name="description" value={description} onChange={this.change} resize="no"></textarea>
                </div>
              </div>
              <div className="field grid-container">
                <div className="col-2-6 col-6-6-md col-6-6-xs"></div>
                <div className="col-2-6 col-6-6-md col-6-6-xs">
                  <button type="submit" className="submit-button button-white" onClick={this.addEntry}>Save to diary</button>
                </div>
                <div className="col-2-6 col-6-6-md col-6-6-xs cancel-div">
                  <button type="submit" className="submit-button button-cancel mt-4-xs mt-4-md" onClick={this.goToHome}>Cancel</button>
                </div>
                <div className="col-3-6 col-6-6-md col-6-6-xs">

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
  success: state.entry.success
});

NewEntry.propTypes = {
  AddEntry: PropTypes.func,
  success: PropTypes.bool
};

export default connect(mapStateToProps, {
  AddEntry
})(NewEntry);

