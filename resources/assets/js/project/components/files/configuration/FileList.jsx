import React, { PropTypes } from 'react';

import Icon from '../../../../app/components/Icon';

const FileList = (props) => {
  const { files } = props;

  const strings = {
    create: Lang.get('projectFiles.create'),
    edit: Lang.get('projectFiles.edit'),
    view: Lang.get('projectFiles.view'),
    label: Lang.get('projectFiles.label'),
    none: Lang.get('projectFiles.none'),
    name: Lang.get('projectFiles.name'),
    path: Lang.get('projectFiles.path'),
  };

  const fileList = [];
  files.forEach((file) => {
    const id = `config_${file.id}`;

    fileList.push(
      <tr key={id} id={id}>
        <td>{file.name}</td>
        <td>{file.path}</td>
        <td>
          <div className="btn-group pull-right">
            <button type="button" className="btn btn-default btn-view" title={strings.view}><Icon fa="eye" /></button>
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
        files.length === 0 ?
          <div className="box-body">
            <p>{strings.none}</p>
          </div>
        :
          <div className="box-body table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>{strings.name}</th>
                  <th>{strings.path}</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>{fileList}</tbody>
            </table>
          </div>
      }
    </div>
  );
};

FileList.propTypes = {
  files: PropTypes.array.isRequired,
};

export default FileList;
