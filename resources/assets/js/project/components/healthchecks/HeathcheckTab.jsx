import React, { PropTypes } from 'react';

import HeartbeatList from './heartbeats/HeartBeatList';
import LinkList from './links/LinkList';
import Loading from '../../../app/components/Loading';

const HealthcheckTab = (props) => {
  const {
    heartbeats,
    links,
    fetching,
  } = props;

  if (fetching) {
    return (<Loading visible />);
  }

  return (
    <div>
      <HeartbeatList heartbeats={heartbeats} />
      <LinkList links={links} />
    </div>
  );
};

HealthcheckTab.propTypes = {
  links: PropTypes.array.isRequired,
  heartbeats: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default HealthcheckTab;
