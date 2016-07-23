import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as constants from '../../constants';
import Dialog from '../../components/commands/variables/VariableDialog';
import { hideDialog } from '../../actions';

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

const mapStateToProps = (state) => {
  const editing = state.getIn([constants.NAME, 'editing']).toJS();

  return {
    project: state.getIn([constants.NAME, 'active']).toJS(),
    variable: editing.instance,
    visible: (state.getIn([constants.NAME, 'showDialog']) === constants.VARIABLE_DIALOG),
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    hideDialog: () => (hideDialog(constants.VARIABLE_DIALOG)),
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VariableDialog);
