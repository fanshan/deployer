import React from 'react';
import { connect } from 'react-redux';

import * as constants from '../constants';

import ServersListComponent from '../components/servers/ServerList';

const Servers = (props) => (<ServersListComponent {...props} />);

const mapStateToProps = (state) => ({
  servers: state.getIn([constants.NAME, 'servers']).toJS(),
});

export default connect(mapStateToProps)(Servers);
