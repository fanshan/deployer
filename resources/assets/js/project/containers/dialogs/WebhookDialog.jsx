import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as constants from '../../constants';
import Dialog from '../../components/commands/commands/WebhookDialog';
import { hideDialog } from '../../actions';

const WebhookDialog = (props) => {
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

WebhookDialog.propTypes = {
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.getIn([constants.NAME, 'active']).toJS(),
  commands: state.getIn([constants.NAME, 'commands']).toJS(),
  visible: (state.getIn([constants.NAME, 'showDialog']) === constants.WEBHOOK_DIALOG),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    hideDialog: () => (hideDialog(constants.WEBHOOK_DIALOG)),
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebhookDialog);
