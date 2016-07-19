import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as constants from '../constants';
import CommandTabComponent from '../components/commands/CommandTab';
import { showDialog } from '../actions';

const CommandTab = (props) => {
  const {
    actions,
    ...others,
  } = props;

  return (
    <CommandTabComponent
      showHelp={() => actions.showDialog(constants.WEBHOOK_DIALOG)}
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
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommandTab);
