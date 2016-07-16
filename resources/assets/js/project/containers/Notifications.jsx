import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as constants from '../constants';

import EmailList from '../components/emails/EmailList';
import NotificationList from '../components/notifications/NotificationList';

const Notifications = (props) => {
  const {
    notifications,
    emails,
  } = props;

  return (
    <div>
      <NotificationList notifications={notifications} />
      <EmailList emails={emails} />
    </div>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  emails: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.getIn([constants.NAME, 'notifications']).toJS(),
  emails: state.getIn([constants.NAME, 'emails']).toJS(),
});

export default connect(mapStateToProps)(Notifications);
