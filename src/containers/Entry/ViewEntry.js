import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './ViewEntry.scss';
import '../../styles/sidebar.scss';
import { ShowEntry } from '../../requests/EntryRequests';
import icon from '../../assets/Rolling.svg';

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
  }

  componentDidMount() {
    this.props.ShowEntry(this.props.match.params.id);
    // document.querySelector('body').insertAdjacentHTML('afterbegin', `<img src=${icon} id="loading"></img>`);
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
    if (this.state.success) {
      const date = this.state.entry.createdat.split('T')[0];
      return (<article>\<h3 className="title text-center white-text">{this.state.entry.title}</h3><span className="small-text light-text primary-text"><b>{date}</b></span><div><small><Link key={this.state.entry.id} to={`/entries/${this.state.entry.id}/update`}>Update</Link> <a href="delete" className="danger-text delete-entry">Delete</a></small></div><p className="description white-text">{this.state.entry.description}</p></article>);
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
  ShowEntry: PropTypes.func,
  success: PropTypes.bool
};

export default connect(mapStateToProps, {
  ShowEntry
})(ViewEntry);

