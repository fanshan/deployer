import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import * as dialog from '../../../dialogs/constants';
import Dialog from '../../components/commands/variables/VariableDialog';
import { hideDialog, saveObject } from '../../../dialogs/actions';

const VariableDialog = (props) => {
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

VariableDialog.propTypes = {
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  initialValues: state.getIn([dialog.NAME, 'instance']).toJS(),
  visible: (state.getIn([dialog.NAME, 'visible']) === dialog.VARIABLE_DIALOG),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    hideDialog: () => (hideDialog(dialog.VARIABLE_DIALOG)),
  }, dispatch),
});

export default reduxForm({
  form: dialog.VARIABLE_DIALOG,
  fields: ['id', 'project_id', 'name', 'value'],
  onSubmit: saveObject,
  getFormState: (state) => state.get('form').toJS(),
}, mapStateToProps, mapDispatchToProps)(VariableDialog);
