import React, { PropTypes } from 'react';

import ServerListComponent from './ServerList';
import Loading from '../../../app/components/Loading';

const ServerTab = (props) => {
  const {
    servers,
    fetching,
  } = props;

  if (fetching) {
    return (<Loading visible />);
  }

  return (<ServerListComponent servers={servers} />);
};

ServerTab.propTypes = {
  servers: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default ServerTab;
