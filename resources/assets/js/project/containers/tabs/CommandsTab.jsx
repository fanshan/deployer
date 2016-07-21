import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as constants from '../../constants';
import * as actions from '../../actions';
import CommandTabComponent from '../../components/commands/CommandTab';
import { showDialog } from '../../actions';

const CommandTab = (props) => {
  const {
    actions,
    ...others,
  } = props;

  return (
    <CommandTabComponent
      showHelp={() => actions.showDialog(constants.WEBHOOK_DIALOG)}
      actions={actions}
      {...others}
    />
  );
};

CommandTab.propTypes = {
  //...Dialog.propTypes,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.getIn([constants.NAME, 'active']).toJS(),
  commands: state.getIn([constants.NAME, 'commands']).toJS(),
  variables: state.getIn([constants.NAME, 'variables']).toJS(),
  fetching: state.getIn([constants.NAME, 'fetching']),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    showDialog,
    addVariable: () => (actions.addObject(constants.VARIABLE_DIALOG)),
    editVariable: (object) => (actions.editObject(constants.VARIABLE_DIALOG, object)),
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommandTab);
