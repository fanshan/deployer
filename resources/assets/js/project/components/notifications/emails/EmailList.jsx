import React, { PropTypes } from 'react';

import Icon from '../../../../app/components/Icon';

const EmailList = (props) => {
  const { emails } = props;

  const strings = {
    create: Lang.get('notifyEmails.create'),
    edit: Lang.get('notifyEmails.edit'),
    label: Lang.get('notifyEmails.label'),
    none: Lang.get('notifyEmails.none'),
    name: Lang.get('notifyEmails.name'),
    email: Lang.get('notifyEmails.email'),
  };

  const emailList = [];
  emails.forEach((email) => {
    const id = `email_${email.id}`;

    emailList.push(
      <tr key={id} id={id}>
        <td>{email.name}</td>
        <td>{email.email}</td>
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
        emails.length === 0 ?
          <div className="box-body">
            <p>{strings.none}</p>
          </div>
        :
          <div className="box-body table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>{strings.name}</th>
                  <th>{strings.email}</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>{emailList}</tbody>
            </table>
          </div>
      }
    </div>
  );
};

EmailList.propTypes = {
  emails: PropTypes.array.isRequired,
};

export default EmailList;
