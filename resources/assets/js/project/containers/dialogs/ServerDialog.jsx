import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import * as dialog from '../../../dialogs/constants';
import Dialog from '../../components/servers/ServerDialog';
import { hideDialog } from '../../../dialogs/actions';

const ServerDialog = (props) => {
  const {
    actions,
    ...others,
  } = props;

  return (
    <Dialog
      onHide={actions.hideDialog}
      {...others}
    />
  );
};

ServerDialog.propTypes = {
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  initialValues: state.getIn([dialog.NAME, 'instance']).toJS(),
  visible: (state.getIn([dialog.NAME, 'visible']) === dialog.SERVER_DIALOG),
  hasError: state.getIn([dialog.NAME, 'hasError']),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    hideDialog: () => (hideDialog(dialog.SERVER_DIALOG)),
  }, dispatch),
});

export default reduxForm({
  form: dialog.SERVER_DIALOG,
  fields: ['id', 'project_id', 'name'],
  onSubmit: () => { alert('here'); },
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
}, mapStateToProps, mapDispatchToProps)(ServerDialog);

