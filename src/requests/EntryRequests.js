import axios from 'axios';
import { createBrowserHistory } from 'history';

import { asyncActions } from '../util/AsyncUtil';
import { NEW_ENTRY, SHOW_ENTRY, UPDATE_ENTRY } from '../actionTypes/EntryConstants';
import { entryConstant } from '../constants/Constants';

const history = createBrowserHistory({ forceRefresh: true });

export const AddEntry = (title, description) => (dispatch) => {
  axios.post(`${entryConstant.ENTRIES_URL}`, { title, description })
    .then((response) => {
      dispatch(asyncActions(NEW_ENTRY).loading(false));
      dispatch(asyncActions(NEW_ENTRY).success(true));
      if (response.data.status === 'Success') {
        document.getElementById('loading').style.display = 'none';
        history.push('/entry/new');
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
  axios.get(`${entryConstant.ENTRIES_URL}/${id}`)
    .then((response) => {
      dispatch(asyncActions(SHOW_ENTRY).loading(false));
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
  axios.put(`${entryConstant.ENTRIES_URL}/${id}`, { title, description })
    .then((response) => {
      dispatch(asyncActions(UPDATE_ENTRY).loading(false));
      if (response.data.status === 'Success') {
        dispatch(asyncActions(UPDATE_ENTRY).success(response.data.entry));
        document.getElementById('loading').style.display = 'none';
        history.push(`/entries/${response.data.entry.id}`);
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