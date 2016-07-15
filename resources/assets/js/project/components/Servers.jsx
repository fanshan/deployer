import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as constants from '../constants';
import Label from '../../app/components/server/ServerLabel';
import Icon from '../../app/components/Icon';

import { SERVER_STATUS_TESTING } from '../../app/constants';

const Servers = (props) => {
  const strings = {
    create: Lang.get('servers.create'),
    label: Lang.get('servers.label'),
    none: Lang.get('servers.none'),
    name: Lang.get('servers.name'),
    connect_as: Lang.get('servers.connect_as'),
    ip_address: Lang.get('servers.ip_address'),
    port: Lang.get('servers.port'),
    runs_code: Lang.get('servers.runs_code'),
    status: Lang.get('servers.status'),
    yes: Lang.get('app.yes'),
    no: Lang.get('app.no'),
    edit: Lang.get('servers.edit'),
    test: Lang.get('servers.test'),
  };

  const { servers } = props;

  const serverList = [];
  servers.forEach((server) => {
    const id = `server_${server.id}`;

    const testing = (server.status === SERVER_STATUS_TESTING);

    serverList.push(
      <tr key={id} id={id}>
        <td>{server.name}</td>
        <td>{server.user}</td>
        <td>{server.ip_address}</td>
        <td>{server.port}</td>
        <td>{server.deploy_code ? strings.yes : strings.no}</td>
        <td><Label status={server.status} /></td>
        <td>
          <div className="btn-group pull-right">
            <button type="button" className="btn btn-default btn-test" title={strings.test} disabled={testing}><Icon fa="refresh" spin={testing} /></button>
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
            <span className="fa fa-plus"></span> {strings.create}
          </button>
        </div>

        <h3 className="box-title">{strings.label}</h3>
      </div>

      {
        servers.length === 0 ?
          <div className="box-body">
            <p>{strings.none}</p>
          </div>
        :
          <div className="box-body table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>{strings.name}</th>
                  <th>{strings.connect_as}</th>
                  <th>{strings.ip_address}</th>
                  <th>{strings.port}</th>
                  <th>{strings.runs_code}</th>
                  <th>{strings.status}</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>{serverList}</tbody>
            </table>
          </div>
      }
    </div>
  );
};

Servers.propTypes = {
  servers: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  servers: state.getIn([constants.NAME, 'servers']).toJS(),
});

export default connect(mapStateToProps)(Servers);
