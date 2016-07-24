import * as actions from './actionTypes';

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
    // dispatch({
    //   type: actions.ADD_OBJECT,
    // });

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
