import axios from 'axios';

import { asyncActions } from '../util/AsyncUtil';
import { ALL_ENTRIES } from '../actionTypes/EntryConstants';
import { entryConstant } from '../constants/Constants';

export const PaginatedEntries = limit => (dispatch) => {
  axios.get(`${entryConstant.ENTRIES_URL}?limit=${limit}`)
    .then((response) => {
      dispatch(asyncActions(ALL_ENTRIES).loading(false));
      dispatch(asyncActions(ALL_ENTRIES).success(response.data.entries));
      dispatch(asyncActions(ALL_ENTRIES).loading(true));
    })
    .catch(error => dispatch(asyncActions(ALL_ENTRIES)
      .failure(true, error.response.data.message)));
};

export const AllEntries = () => (dispatch) => {
  axios.get(`${entryConstant.ENTRIES_URL}`)
    .then((response) => {
      dispatch(asyncActions(ALL_ENTRIES).loading(false));
      dispatch(asyncActions(ALL_ENTRIES).success(response.data.entries));
      dispatch(asyncActions(ALL_ENTRIES).loading(true));
    })
    .catch(error => dispatch(asyncActions(ALL_ENTRIES)
      .failure(true, error.response.data.message)));
};
