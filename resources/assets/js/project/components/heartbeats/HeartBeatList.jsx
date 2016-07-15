import React, { PropTypes } from 'react';

import Icon from '../../../app/components/Icon';

const HeartBeatList = (props) => {
  const { heartbeats } = props;

  const strings = {
    create: Lang.get('heartbeats.create'),
    edit: Lang.get('heartbeats.edit'),
    label: Lang.get('heartbeats.label'),
    none: Lang.get('heartbeats.none'),
    name: Lang.get('heartbeats.name'),
    url: Lang.get('heartbeats.url'),
    interval: Lang.get('heartbeats.interval'),
    last_check_in: Lang.get('heartbeats.last_check_in'),
    status: Lang.get('heartbeats.status'),
    never: Lang.get('app.never'),
  };

  const heartbeatList = [];
  heartbeats.forEach((heartbeat) => {
    const id = `heartbeat_${heartbeat.id}`;

    heartbeatList.push(
      <tr key={id} id={id}>
        <td>{heartbeat.name}</td>
        <td>{heartbeat.callback_url}</td>
        <td>{heartbeat.interval}</td>
        <td>{strings.never}</td>
        <td>{heartbeat.status}</td>
        <td>
          <div className="btn-group pull-right">
            <button type="button" className="btn btn-default btn-edit" title={strings.create}><Icon fa="edit" /></button>
          </div>
        </td>
      </tr>
    );
  });

  /*


   <td>
   <span class="label label-<%- status_css %>"><i class="fa fa-<%-icon_css %>"></i> <%- status %></span>

   <td><%- callback_url %></td>
   <td><%- interval_label %></td>
   <td>
   <% if (has_run) { %>
   <%- formatted_date %>
   <% } else { %>
   {{ Lang::get('app.never') }}
   <% } %>
   </td>
   */

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
        heartbeats.length === 0 ?
          <div className="box-body">
            <p>{strings.none}</p>
          </div>
        :
          <div className="box-body table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>{strings.name}</th>
                  <th>{strings.url}</th>
                  <th>{strings.interval}</th>
                  <th>{strings.last_check_in}</th>
                  <th>{strings.status}</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>{heartbeatList}</tbody>
            </table>
          </div>
      }
    </div>
  );
};

HeartBeatList.propTypes = {
  heartbeats: PropTypes.array.isRequired,
};

export default HeartBeatList;
