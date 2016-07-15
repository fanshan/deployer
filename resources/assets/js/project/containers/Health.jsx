import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as constants from '../constants';

import HeartbeatList from '../components/heartbeats/HeartBeatList';
import LinkList from '../components/links/LinkList';

const Health = (props) => {
  const {
    heartbeats,
    links,
  } = props;

  return (
    <div>
      <HeartbeatList heartbeats={heartbeats} />
      <LinkList links={links} />
    </div>
  );
};

Health.propTypes = {
  heartbeats: PropTypes.array.isRequired,
  links: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  heartbeats: state.getIn([constants.NAME, 'heartbeats']).toJS(),
  links: state.getIn([constants.NAME, 'links']).toJS(),
});

export default connect(mapStateToProps)(Health);
