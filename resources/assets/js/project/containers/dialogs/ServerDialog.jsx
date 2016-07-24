import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as constants from '../../constants';
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
  project: state.getIn([constants.NAME, 'active']).toJS(),
  server: state.getIn([dialog.NAME, 'instance']).toJS(),
  visible: (state.getIn([dialog.NAME, 'visible']) === dialog.SERVER_DIALOG),
  hasError: state.getIn([dialog.NAME, 'hasError']),
  errors: state.getIn([dialog.NAME, 'errors']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    hideDialog: () => (hideDialog(dialog.SERVER_DIALOG)),
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerDialog);
