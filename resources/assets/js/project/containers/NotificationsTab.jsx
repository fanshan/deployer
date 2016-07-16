import React from 'react';
import { connect } from 'react-redux';

import * as constants from '../constants';
import NotificationTab from '../components/notifications/NotificationTab';

const Notifications = (props) => (<NotificationTab {...props} />);

const mapStateToProps = (state) => ({
  notifications: state.getIn([constants.NAME, 'notifications']).toJS(),
  emails: state.getIn([constants.NAME, 'emails']).toJS(),
  fetching: state.getIn([constants.NAME, 'fetching']),
});

export default connect(mapStateToProps)(Notifications);

