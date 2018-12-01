import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './ViewEntry.scss';
import '../../styles/sidebar.scss';
import { ShowEntry, DeleteEntry } from '../../requests/EntryRequests';
import { checkNotice } from '../../helpers/checkNotice';

/**
 * @class ViewEntry
 * @extends {Component}
 */
export class ViewEntry extends Component {
  /**
   *Creates an instance of NewEntry.
   * @memberof ViewEntry
   */
  constructor() {
    super();
    this.state = {
      entry: {},
      mmessage: '',
      success: false
    };
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  componentDidMount() {
    document.querySelector('main').style.backgroundImage = "url('https://i.imgur.com/n4ttyU5.jpg')";
    checkNotice();
    this.props.ShowEntry(this.props.match.params.id);
    document.querySelector('body').insertAdjacentHTML('afterbegin', `<img src="http://res.cloudinary.com/ddfepbdqg/image/upload/v1543597369/Rolling.svg" id="loading"></img>`);
  }

  deleteEntry(e) {
    e.preventDefault();
    this.props.DeleteEntry(this.state.entry.id);
  }

  /**
   * @description - This method runs whenever redux state changes
   * @returns {object} state
   * @param {object} props
   * @param {object} state
   * @memberof ViewTag
   */
  static getDerivedStateFromProps(props, state) {
    return {
      entry: props.entry,
      message: props.message,
      success: props.success
    };
  }

  /**
   *
   * @returns {jsx} - jsx
   * @memberof NewEntry
   */
  viewEntry(e) {
    if (this.state.success && this.state.entry.createdat) {
      const date = this.state.entry.createdat.split('T')[0];
      return (<article><h3 className="title text-center white-text">{this.state.entry.title}</h3><span className="small-text light-text primary-text"><b>{date}</b></span><div><small><Link key={this.state.entry.id} to={`/entries/${this.state.entry.id}/update`}>Update</Link> <a href="delete" className="danger-text delete-entry" onClick={this.deleteEntry}>Delete</a></small></div><p className="description white-text">{this.state.entry.description}</p></article>);
    } else {
      return (<h3 className="text-center white-text">{this.state.message}</h3>);
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
        <section id="show">
          {this.viewEntry()}
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

ViewEntry.propTypes = {
  match: PropTypes.object,
  message: PropTypes.string,
  DeleteEntry: PropTypes.func,
  ShowEntry: PropTypes.func,
  success: PropTypes.bool
};

export default connect(mapStateToProps, {
  DeleteEntry, ShowEntry
})(ViewEntry);

