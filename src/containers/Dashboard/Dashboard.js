import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Dashboard.scss';
import slide1 from '../../../public/images/slide1.jpg';
import slide2 from '../../../public/images/slide2.jpg';
import slide3 from '../../../public/images/slide3.jpg';
import { AllEntries, PaginatedEntries } from '../../requests/EntriesRequests';

/**
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      success: false
    };
    this.goToNewEntryPage = this.goToNewEntryPage.bind(this);
    this.viewEntries = this.viewEntries.bind(this);
    this.insertEntriesList = this.insertEntriesList.bind(this);
  }
  componentDidMount() {
    this.props.PaginatedEntries(4);
    this.startSlider();
    console.log('component did mount');
  }

   /**
   * @description - This method runs whenever redux state changes
   * @returns {object} state
   * @param {object} props
   * @param {object} state
   * @memberof ViewTag
   */
  static getDerivedStateFromProps(props, state) {
    goToNewEntryPage();
    return {
      entries: props.entries,
      success: props.success
    };
  }

  /**
   *
   * @returns {jsx} - jsx
   * @memberof Dashboard
   */
  static goToNewEntryPage() {
    alert('alert me');
  }

  /**
   *
   * @returns {jsx} - jsx
   * @memberof Dashboard
   */
  showRecentEntries() {
    if (this.state.entries.length) {
      return this.state.entries.map(entry => (<li key={entry.id}><Link to={`entries/${entry.id}`}><h4 className="title">{entry.title.slice(0, 50)}</h4></Link></li>));
    } else {
      // document.querySelector('aside .no-styling h3').style.color = '#DFAC2C';
      return (<h3 className="text-center">No entries</h3>);
    }
  }

  startSlider() {
    // slider animations
    document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#DFAC2C';
    $('#carousel > ul li:nth-child(1)').on('click', function () {
      $('.img2-container').fadeOut('fast');
      $('.img3-container').fadeOut('fast');
      $('.img1-container').fadeIn('fast');
      document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#DFAC2C';
      document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#052F60';
      document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#052F60';
    });
    $('#carousel > ul li:nth-child(2)').on('click', function () {
      $('.img1-container').fadeOut('fast');
      $('.img3-container').fadeOut('fast');
      $('.img2-container').fadeIn('fast');
      document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#DFAC2C';
      document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
      document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#052F60';
    });
    $('#carousel > ul li:nth-child(3)').on('click', function () {
      $('.img1-container').fadeOut('fast');
      $('.img2-container').fadeOut('fast');
      $('.img3-container').fadeIn('fast');
      document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#DFAC2C';
      document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
      document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#052F60';
    });
    setInterval(function () {
      setTimeout(function () {
        $('.img1-container').fadeOut('fast');
        $('.img3-container').fadeOut('fast');
        $('.img2-container').fadeIn('fast');
        document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#DFAC2C';
        document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
        document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#052F60';
      }, 3000);
      setTimeout(function () {
        $('.img1-container').fadeOut('fast');
        $('.img2-container').fadeOut('fast');
        $('.img3-container').fadeIn('fast');
        document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#DFAC2C';
        document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
        document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#052F60';
      }, 7000);
      setTimeout(function () {
        $('.img2-container').fadeOut('fast');
        $('.img3-container').fadeOut('fast');
        $('.img1-container').fadeIn('fast');
        document.querySelector('#carousel > ul li:nth-child(2) h4').style.color = '#DFAC2C';
        document.querySelector('#carousel > ul li:nth-child(1) h4').style.color = '#052F60';
        document.querySelector('#carousel > ul li:nth-child(3) h4').style.color = '#052F60';
      }, 11000);
    }, 11000);
    // slider animations
  }

  /**
   *
   * @returns {jsx} - jsx
   * @memberof Dashboard
   */
  viewEntries() {
    const offset = 0;
    const limit = 7;
    document.querySelector('#dashboard').style.display = 'none';
    document.querySelector('#index').style.display = 'block';
    document.querySelector('body').insertAdjacentHTML('afterbegin', '<img src="images/Rolling.svg" id="loading" />');
    this.props.AllEntries();
    // document.getElementById('loading').style.display = 'none';
    if (this.state.entries.length) {
			// eslint-disable-next-line
			this.paginate(this.state.entries.length, offset, limit, this.state.entries, true);
			window.en = this.state.entries;
			// eslint-disable-next-line
      this.insertEntriesList(offset, limit);
		} else if (!this.state.entries.length) {
			document.querySelector('#index .no-styling').innerHTML = '<h3 class="text-center danger-text">You do not have any entries yet..<a href="add.html">Create one now</a></h3>';
		}
  }

  /**
   *
   * @returns {jsx} - jsx
   * @memberof Dashboard
   */
  insertEntriesList(offset, limit) {
    let allEntries = window.en;
    allEntries = window.en.slice(offset, offset + limit);
    let html = '<li></li>';
    allEntries.map(function (entry) {
      const date = entry.createdat.split('T')[0];
      html += `<li>\n\t\t<h4 class="title"><a href="show.html?entries=${entry.id}">${entry.title}</a> <span class="small-text light-text">${date}</span></h4>\n\t\t<p class="description">${entry.description.slice(0, 150)}<a href="show.html?entries=${entry.id}">Read more...</a></p>\n\t\t</li>`;
      return entry;
    });
    document.querySelector('#index .no-styling').innerHTML = html;
  }
  /**
   *
   * @returns {jsx} - jsx
   * @memberof Dashboard
   */
  paginate(totalNoEntries, startFrom, perPage, allEntries, arrows) {
    const noEntries = totalNoEntries <= perPage ? perPage : totalNoEntries;
    const remainder = noEntries % perPage > 0 ? 1 : 0;
    const no = noEntries / perPage + remainder;
    const array = [];
    let li = '<li class="list-inline"></li>';
    let offset = startFrom;
    for (let i = 1; i <= no; i += 1) {
      array.push(i);
      li += `<li class="list-inline" onClick="this.insertEntriesList(${offset},${perPage})">${i}</li>`;
      offset += perPage;
    }
    document.querySelector('.pagination').innerHTML = `<ul class="no-styling">\n\t\t${li}<li class="list-inline"></li>\n\t</ul>`;
  }

  /**
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof Dashboard
   */
  render() {
    return (
      <div>
        <section id="dashboard">
					<div className="grid-container">
						<div className="col-2-6 col-6-6-md col-6-6-xs" id="left">
							<div className="text-center">
								<button onClick={this.goToNewEntryPage}>Create A New Entry</button>
								<button onClick={this.viewEntries}>View Entries</button> <br />
								<aside className="sidebar">
                  <h4 className="text-center">Recent Entries</h4>
                  <hr />
                  <ul className="no-styling">
                    { this.showRecentEntries() }
                  </ul>
		            </aside>
							</div>
						</div>
						<div className="col-4-6 col-6-6-md col-6-6-xs" id="right">
							<h2 className="text-center" id="title">Welcome To Your Daily Journal</h2>
							<div id="carousel">
								<div className="img1-container slideshow">
									<div className="content p-2">
										<h1 className="text-center white-text">Mark Down Important Events</h1>
										<p className="text-center white-text"></p>
									</div>
                  <img src="https://via.placeholder.com/300?text=AuthorsHaven"></img>
								</div>
								<div className="img2-container slideshow">
									<div className="content p-2">
										<h1 className="text-center white-text">Organise Your Life Events</h1>
										<p className="text-center white-text"></p>
									</div>
									<img src="https://via.placeholder.com/300?text=AuthorsHaven"></img>
								</div>
								<div className="img3-container slideshow">
									<div className="content p-2">
										<h1 className="text-center white-text">Keep A Diary, And Someday It'll Keep You</h1>
										<p className="text-center white-text"></p>
									</div>
									<img src={slide3}></img>
								</div>
								<ul className="no-styling">
									<li><h4 className="text-info"><b>01</b></h4></li>
									<li><h4 className="text-info"><b>02</b></h4></li>
									<li><h4 className="text-info"><b>03</b></h4></li>
								</ul>
							</div>

						</div>
					</div>
        </section>
				<section id="index">
          <h3 className="underline text-center">Diary Entries</h3>
          <ul className="no-styling">

          </ul>
          <div className="pagination text-center">

          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entries: state.entry.entries,
  success: state.entry.success
});

Dashboard.propTypes = {
  AllEntries: PropTypes.func,
  PaginatedEntries: PropTypes.func,
  success: PropTypes.bool
};

export default connect(mapStateToProps, {
  AllEntries, PaginatedEntries
})(Dashboard);
