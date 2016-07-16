import React, { PropTypes } from 'react';

import NotificationList from './slack/NotificationList';
import EmailList from './emails/EmailList';
import Loading from '../../../app/components/Loading';

const NotificationTab = (props) => {
  const {
    notifications,
    emails,
    fetching,
  } = props;

  if (fetching) {
    return (<Loading visible />);
  }

  return (
    <div>
      <NotificationList notifications={notifications} />
      <EmailList emails={emails} />
    </div>
  );
};

NotificationTab.propTypes = {
  notifications: PropTypes.array.isRequired,
  emails: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default NotificationTab;
