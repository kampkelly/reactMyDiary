import axios from 'axios';
import { createBrowserHistory } from 'history';

import { asyncActions } from '../util/AsyncUtil';
import { NEW_ENTRY, SHOW_ENTRY, UPDATE_ENTRY, ALL_ENTRIES, PAGINATED_ENTRIES, DELETE_ENTRY } from '../actionTypes/EntryConstants';
import { entryConstant } from '../constants/Constants';

const history = createBrowserHistory({ forceRefresh: true });

export const AddEntry = (title, description) => (dispatch) => {
  dispatch(asyncActions(NEW_ENTRY).loading(false));
  return axios.post(`${entryConstant.ENTRIES_URL}`, { title, description })
    .then((response) => {
      if (response.data.status === 'Success') {
        dispatch(asyncActions(NEW_ENTRY).success(true));
        document.getElementById('loading').style.display = 'none';
        history.push(`/entries/${response.data.entry.id}?notice=${response.data.message}`);
      } else {
        document.getElementById('loading').style.display = 'none';
        document.querySelector('.form_error_text').style.display = 'block';
        document.querySelector('.form_error_text small').textContent = response.data.message;
      }
      dispatch(asyncActions(NEW_ENTRY).loading(true));
    })
    .catch(error => dispatch(asyncActions(NEW_ENTRY)
      .failure(true, error.response.data.message)));
};

export const ShowEntry = id => (dispatch) => {
  dispatch(asyncActions(SHOW_ENTRY).loading(false));
  return axios.get(`${entryConstant.ENTRIES_URL}/${id}`)
    .then((response) => {
      document.getElementById('loading').style.display = 'none';
      if (response.data.status === 'Success') {
        dispatch(asyncActions(SHOW_ENTRY).success(response.data.entry));
      }
      dispatch(asyncActions(SHOW_ENTRY).loading(true));
    })
    .catch(error => dispatch(asyncActions(SHOW_ENTRY)
      .failure(true, error.response.data.message)));
};

export const ModifyEntry = (id, title, description) => (dispatch) => {
  dispatch(asyncActions(UPDATE_ENTRY).loading(false));
  return axios.put(`${entryConstant.ENTRIES_URL}/${id}`, { title, description })
    .then((response) => {
      if (response.data.status === 'Success') {
        dispatch(asyncActions(UPDATE_ENTRY).success(response.data.entry));
        document.getElementById('loading').style.display = 'none';
        history.push(`/entries/${response.data.entry.id}?notice=${response.data.message}`);
      } else {
        document.getElementById('loading').style.display = 'none';
        document.querySelector('.form_error_text').style.display = 'block';
        document.querySelector('.form_error_text small').textContent = response.data.message;
      }
      dispatch(asyncActions(UPDATE_ENTRY).loading(true));
    })
    .catch(error => dispatch(asyncActions(UPDATE_ENTRY)
      .failure(true, error.response.data.message)));
};

export const AllEntries = () => (dispatch) => {
  dispatch(asyncActions(ALL_ENTRIES).loading(false));
  return axios.get(`${entryConstant.ENTRIES_URL}`)
    .then((response) => {
      document.getElementById('loading').style.display = 'none';
      dispatch(asyncActions(ALL_ENTRIES).success(response.data.entries));
      dispatch(asyncActions(ALL_ENTRIES).loading(true));
    })
    .catch(error => dispatch(asyncActions(ALL_ENTRIES)
      .failure(true, error.response.data.message)));
};

export const PaginatedEntries = limit => (dispatch) => {
  dispatch(asyncActions(PAGINATED_ENTRIES).loading(false));
  return axios.get(`${entryConstant.ENTRIES_URL}?limit=${limit}`)
    .then((response) => {
      dispatch(asyncActions(PAGINATED_ENTRIES).success(response.data.entries));
      dispatch(asyncActions(PAGINATED_ENTRIES).loading(true));
    })
    .catch(error => dispatch(asyncActions(PAGINATED_ENTRIES)
      .failure(true, error.response.data.message)));
};

export const DeleteEntry = id => (dispatch) => {
  axios.delete(`${entryConstant.ENTRIES_URL}/${id}`)
    .then((response) => {
      dispatch(asyncActions(DELETE_ENTRY).loading(false));
      dispatch(asyncActions(DELETE_ENTRY).success(true));
      dispatch(asyncActions(DELETE_ENTRY).loading(true));
      history.push('/dashboard?notice=Entry has been deleted');
    })
    .catch(error => dispatch(asyncActions(DELETE_ENTRY)
      .failure(true, error.response.data.message)));
};