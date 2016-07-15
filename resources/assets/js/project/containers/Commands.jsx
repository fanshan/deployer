import React from 'react';
import { connect } from 'react-redux';

import * as constants from '../constants';

import CommandListComponent from '../components/commands/CommandList';

const Commands = (props) => (<CommandListComponent {...props} />);

const mapStateToProps = (state) => ({
  project: state.getIn([constants.NAME, 'active']),
  commands: state.getIn([constants.NAME, 'commands']).toJS(),
  variables: state.getIn([constants.NAME, 'variables']).toJS(),
});

export default connect(mapStateToProps)(Commands);
