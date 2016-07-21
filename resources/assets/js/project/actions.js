import 'isomorphic-fetch';

import * as actions from './actionTypes';

function receivedProjectData(response) {
  return {
    type: actions.LOADED_PROJECT,
    ...response,
  };
}

function isFetching() {
  return {
    type: actions.FETCH_PROJECT,
  };
}

export function setProject(project) {
  return {
    type: actions.SET_ACTIVE_PROJECT,
    project,
  };
}

export function clearActiveProject() {
  return {
    type: actions.CLEAR_ACTIVE_PROJECT,
  };
}

export function fetchProject(project) {
  return (dispatch) => {
    dispatch(isFetching());

    return fetch(`/api/projects/${project.id}`, {
      credentials: 'same-origin', // FIXME: Add a helper function so we don't have to duplicate this
    })
    .then(response => response.json())
    .then(json => dispatch(receivedProjectData(json)))
    .catch(error => console.log(error)); // FIXME: Need some sort of error handler
  };
}


export function showDialog(dialog) {
  return {
    type: actions.SHOW_DIALOG,
    dialog,
  };
}

export function hideDialog() {
  return {
    type: actions.HIDE_DIALOG,
  };
}

// FIXME: Or should we use redux-multi for this instead?

export function addObject(dialog) {
  return (dispatch) => {
    dispatch({
      type: actions.ADD_OBJECT,
    });

    dispatch(showDialog(dialog));
  };
}

export function editObject(dialog, instance) {
  return (dispatch) => {

    dispatch({
      type: actions.EDIT_OBJECT,
      instance,
    });

    dispatch(showDialog(dialog));
  };
}
