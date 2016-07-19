import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as constants from '../constants';
import Dialog from '../components/commands/commands/WebhookDialog';
//import { hideKey } from '../actions';

const WebhookDialog = (props) => {
  const {
    actions,
    ...others,
  } = props;

  return (
    <Dialog onHide={actions.hideDialog} {...others} />
  );
};

WebhookDialog.propTypes = {
  ...Dialog.propTypes,
  actions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.getIn([constants.NAME, 'active']).toJS(),
  commands: state.getIn([constants.NAME, 'commands']).toJS(),
  visible: true,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    hideDialog: () => {},
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebhookDialog);
