import React from 'react';
import { connect } from 'react-redux';

import * as constants from '../constants';
import ServerTab from '../components/servers/ServerTab';

const Servers = (props) => (<ServerTab {...props} />);

const mapStateToProps = (state) => ({
  servers: state.getIn([constants.NAME, 'servers']).toJS(),
  fetching: state.getIn([constants.NAME, 'fetching']),
});

export default connect(mapStateToProps)(Servers);
