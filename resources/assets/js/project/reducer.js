import Immutable from 'immutable';

import * as actions from './actionTypes';

const initialState = Immutable.fromJS({
  active: null,
  showDialog: false,
  fetching: false,
  editing: {},
  servers: [],
  notifications: [],
  emails: [],
  heartbeats: [],
  sharedFiles: [],
  projectFiles: [],
  links: [],
  variables: [],
  commands: [],
  tags: [],
  branches: [],
  deployments: [],
});

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.ADD_OBJECT:
      return state.set('editing', {});
    case actions.EDIT_OBJECT:
      return state.set('editing', action.instance);
    case actions.FETCH_PROJECT:
      return state.set('fetching', true);
    case actions.LOADED_PROJECT:
      return state.merge({
        fetching: false,
        servers: action.servers,
        notifications: action.notifications,
        emails: action.notifyEmails,
        heartbeats: action.heartbeats,
        sharedFiles: action.sharedFiles,
        projectFiles: action.projectFiles,
        links: action.checkUrls,
        variables: action.variables,
        commands: action.commands,
        tags: action.tags,
        branches: action.branches,
      });
    case actions.HIDE_DIALOG:
      return state.set('showDialog', false);
    case actions.SHOW_DIALOG:
      return state.set('showDialog', action.dialog);
    case actions.CLEAR_ACTIVE_PROJECT:
      return state.merge({ // FIXME: There has to be a cleaner way to do this?
        active: null,
        showDialog: false,
        fetching: false,
        editing: {},
        servers: [],
        notifications: [],
        emails: [],
        heartbeats: [],
        sharedFiles: [],
        projectFiles: [],
        links: [],
        variables: [],
        commands: [],
        tags: [],
        branches: [],
        deployments: [],
      });
    case actions.SET_ACTIVE_PROJECT: {
      const active = action.project;
      const deployments = active.latest_deployments;

      delete active.latest_deployments;

      return state.merge({
        active,
        deployments,
      });
    }
    default:
      return state;
  }
}
