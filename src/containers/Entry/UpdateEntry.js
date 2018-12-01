import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './NewEntry.scss';
import '../../styles/form.scss';
import '../../styles/sidebar.scss';
import { ModifyEntry, ShowEntry } from '../../requests/EntryRequests';
import { validateForm } from '../../helpers/validateForm';

/**
 * @class UpdateEntry
 * @extends {Component}
 */
class UpdateEntry extends Component {
  /**
   *Creates an instance of UpdateEntry.
   * @memberof UpdateEntry
   */
  constructor() {
    super();
    this.state = {
      editMode: false,
      description: '',
      entry: {},
      title: '',
      message: '',
      success: false
    };
    this.updateEntry = this.updateEntry.bind(this);
    this.change = this.change.bind(this);
    this.goToHome = this.goToHome.bind(this);
  }

  componentDidMount() {
    document.querySelector('main').style.backgroundImage = "url('https://i.imgur.com/n4ttyU5.jpg')";
    this.props.ShowEntry(this.props.match.params.id);
    document.querySelector('body').insertAdjacentHTML('afterbegin', `<img src="http://res.cloudinary.com/ddfepbdqg/image/upload/v1543597369/Rolling.svg" id="loading"></img>`);
  }

  /**
   * @description - This method runs whenever redux state changes
   * @returns {object} state
   * @param {object} props
   * @param {object} state
   * @memberof ViewTag
   */
  static getDerivedStateFromProps(props, state) {
    if (state.editMode) {
      return {
        entry: props.entry,
        message: props.message,
        success: props.success
      };
    }
    if (!state.editMode && props.entry.title) {
      return {
        editMode: true,
        title: props.entry.title,
        description: props.entry.description,
        entry: props.entry,
        message: props.message,
        success: props.success
      };
    }
  }

  goToHome() {
    this.props.history.push('/dashboard');
  }

  /**
   *
   * @returns {jsx} - jsx
   * @memberof NewEntry
   */
  updateEntry(e) {
    const errorMessage = 'One or more of the required fields are empty!';
    const values = { title: this.state.title, description: this.state.description };
    const noneEmpty = validateForm(errorMessage, values, e);
    if (noneEmpty === true) {
      document.querySelector('body').insertAdjacentHTML('afterbegin', `<img src="http://res.cloudinary.com/ddfepbdqg/image/upload/v1543597369/Rolling.svg" id="loading"></img>`);
      this.props.ModifyEntry(this.props.match.params.id, this.state.title, this.state.description);
    }
  }

  change(e) {
    this.setState({ [e.target.name]: e.target.value });
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
          <div className="white-forms form-cover text-center">
            <form className="add_form" id="add-form">
              <h3 className="title text-center white-text">What is happening today?</h3>
              <p className="danger-text form_error_text"><small></small></p>
              <p className="success-text form_success_text"><small></small></p>
              <div className="field grid-container">
                <div className="col-2-6 col-6-6-md col-6-6-xs">
                  <label className="white-text">Title:</label>
                </div>
                <div className="col-4-6 col-6-6-md col-6-6-xs">
                  <input type="text" required="true" className="control-form" id="title" name="title" defaultValue={title} onChange={this.change} autoComplete="title" />
                </div>
              </div>
              <div className="field grid-container">
                <div className="col-2-6 col-6-6-md col-6-6-xs">
                  <label className="white-text">Description:</label>
                </div>
                <div className="col-4-6 col-6-6-md col-6-6-xs">
                  <textarea className="control-form" id="description" required="true" name="description" defaultValue={description} onChange={this.change} resize="no"></textarea>
                </div>
              </div>
              <div className="field grid-container">
                <div className="col-2-6 col-6-6-md col-6-6-xs"></div>
                <div className="col-2-6 col-6-6-md col-6-6-xs">
                  <button type="submit" className="submit-button button-white" onClick={this.updateEntry}>Update entry</button>
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
  entry: state.entry.entry,
  message: state.entry.message,
  success: state.entry.success
});

UpdateEntry.propTypes = {
  ModifyEntry: PropTypes.func,
  ShowEntry: PropTypes.func,
  success: PropTypes.bool
};

export default connect(mapStateToProps, {
  ModifyEntry, ShowEntry
})(UpdateEntry);

