import Immutable from 'immutable';

import * as actions from './actionTypes';

const initialState = Immutable.fromJS({
  visible: false,
  instance: {},
  hasErrors: false,
  errors: [],
});

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.ADD_OBJECT:
      return state.merge({
        instance: {},
        hasErrors: false,
        errors: [],
      });
    case actions.EDIT_OBJECT:
      return state.merge({
        instance: action.instance,
        hasErrors: false,
        errors: [],
      });
    case actions.HIDE_DIALOG:
      return state.merge({
        visible: false,
        instance: {},
        hasErrors: false,
        errors: [],
      });
    case actions.SHOW_DIALOG:
      return state.set('visible', action.dialog);
    default:
      return state;
  }
}
