import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Icon from '../../../../app/components/Icon';

const Commands = (props) => {
  const {
    commands,
    project,
  } = props;

  const strings = {
    label: Lang.get('commands.label'),
    step: Lang.get('commands.step'),
    after: Lang.get('commands.after'),
    before: Lang.get('commands.before'),
    none: Lang.get('app.none'),
    configure: Lang.get('commands.configure'),
    clone: Lang.get('commands.clone'),
    install: Lang.get('commands.install'),
    activate: Lang.get('commands.activate'),
    purge: Lang.get('commands.purge'),
  };

  return (
    <div className="box">
      <div className="box-header">
        <h3 className="box-title">{strings.label}</h3>
      </div>
      <div className="box-body table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>{strings.step}</th>
              <th>{strings.before}</th>
              <th>{strings.after}</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{strings.clone}</td>
              <td>{strings.none}</td>
              <td>{strings.none}</td>
              <td>
                <div className="btn-group pull-right">
                  <Link to={`/projects/${project.id}/commands/clone`} className="btn btn-default" title={strings.configure}><Icon fa="gear" /></Link>
                </div>
              </td>
            </tr>
            <tr>
              <td>{strings.install}</td>
              <td>{strings.none}</td>
              <td>{strings.none}</td>
              <td>
                <div className="btn-group pull-right">
                  <Link to={`/projects/${project.id}/commands/install`} className="btn btn-default" title={strings.configure}><Icon fa="gear" /></Link>
                </div>
              </td>
            </tr>
            <tr>
              <td>{strings.activate}</td>
              <td>{strings.none}</td>
              <td>{strings.none}</td>
              <td>
                <div className="btn-group pull-right">
                  <Link to={`/projects/${project.id}/commands/activate`} className="btn btn-default" title={strings.configure}><Icon fa="gear" /></Link>
                </div>
              </td>
            </tr>
            <tr>
              <td>{strings.purge}</td>
              <td>{strings.none}</td>
              <td>{strings.none}</td>
              <td>
                <div className="btn-group pull-right">
                  <Link to={`/projects/${project.id}/commands/purge`} className="btn btn-default" title={strings.configure}><Icon fa="gear" /></Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

Commands.propTypes = {
  project: PropTypes.object.isRequired,
  commands: PropTypes.array.isRequired,
};

export default Commands;

