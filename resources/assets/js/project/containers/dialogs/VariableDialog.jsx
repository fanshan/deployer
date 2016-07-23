import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as constants from '../../constants';
import * as dialog from '../../../dialogs/constants';
import Dialog from '../../components/commands/variables/VariableDialog';
import { hideDialog } from '../../../dialogs/actions';

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
  project: state.getIn([constants.NAME, 'active']).toJS(),
  variable: state.getIn([dialog.NAME, 'instance']).toJS(),
  visible: (state.getIn([dialog.NAME, 'visible']) === dialog.VARIABLE_DIALOG),
  hasError: state.getIn([dialog.NAME, 'hasError']),
  errors: state.getIn([dialog.NAME, 'errors']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    hideDialog: () => (hideDialog(dialog.VARIABLE_DIALOG)),
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VariableDialog);
