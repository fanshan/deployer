import React, { PropTypes } from 'react';

import Icon from '../../../app/components/Icon';

const NotificationList = (props) => {
  const { notifications } = props;

  const strings = {
    create: Lang.get('notifications.create'),
    edit: Lang.get('notifications.edit'),
    label: Lang.get('notifications.slack'),
    none: Lang.get('notifications.none'),
    name: Lang.get('notifications.name'),
    channel: Lang.get('notifications.channel'),
    notify_failure_only: Lang.get('notifications.notify_failure_only'),
    yes: Lang.get('app.yes'),
    no: Lang.get('app.no'),
  };

  const notificationList = [];
  notifications.forEach((notification) => {
    const id = `notification_${notification.id}`;

    notificationList.push(
      <tr key={id} id={id}>
        <td>{notification.name}</td>
        <td>{notification.channel}</td>
        <td>{notification.failure_only ? strings.yes : strings.no}</td>
        <td>
          <div className="btn-group pull-right">
            <button type="button" className="btn btn-default btn-edit" title={strings.edit}><Icon fa="edit" /></button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className="box">
      <div className="box-header">
        <div className="pull-right">
          <button type="button" className="btn btn-default" title={strings.create}>
            <Icon fa="plus" /> {strings.create}
          </button>
        </div>
        <h3 className="box-title">{strings.label}</h3>
      </div>

      {
        notifications.length === 0 ?
          <div className="box-body">
            <p>{strings.none}</p>
          </div>
        :
          <div className="box-body table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>{strings.name}</th>
                  <th>{strings.channel}</th>
                  <th>{strings.notify_failure_only}</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>{notificationList}</tbody>
            </table>
          </div>
      }
    </div>
  );
};

NotificationList.propTypes = {
  notifications: PropTypes.array.isRequired,
};

export default NotificationList;
