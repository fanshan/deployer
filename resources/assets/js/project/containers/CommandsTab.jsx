import React from 'react';
import { connect } from 'react-redux';

import * as constants from '../constants';
import CommandTab from '../components/commands/CommandTab';

const Commands = (props) => (<CommandTab {...props} />);

const mapStateToProps = (state) => ({
  project: state.getIn([constants.NAME, 'active']),
  commands: state.getIn([constants.NAME, 'commands']).toJS(),
  variables: state.getIn([constants.NAME, 'variables']).toJS(),
  fetching: state.getIn([constants.NAME, 'fetching']),
});

export default connect(mapStateToProps)(Commands);
