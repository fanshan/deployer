import React, { PropTypes } from 'react';

import Icon from '../../../app/components/Icon';
import Label from './LinkLabel';

const LinkList = (props) => {
  const { links } = props;

  const strings = {
    create: Lang.get('checkUrls.create'),
    edit: Lang.get('checkUrls.edit'),
    label: Lang.get('checkUrls.label'),
    none: Lang.get('checkUrls.none'),
    title: Lang.get('checkUrls.title'),
    url: Lang.get('checkUrls.url'),
    frequency: Lang.get('checkUrls.frequency'),
    last_status: Lang.get('checkUrls.last_status'),
    minutes: Lang.get('checkUrls.minutes'),
  };

  const linksList = [];
  links.forEach((link) => {
    const id = `link_${link.id}`;

    linksList.push(
      <tr key={id} id={id}>
        <td>{link.title}</td>
        <td>{link.url}</td>
        <td>{link.period} {strings.minutes}</td>
        <td><Label status={link.last_status} /></td>
        <td>
          <div className="btn-group pull-right">
            <button type="button" className="btn btn-default btn-edit" title={strings.edit}><Icon fa="edit" /></button>
          </div>
        </td>
      </tr>
    );
  });

  /*

   <td><%- interval_label %></td>
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
        links.length === 0 ?
          <div className="box-body">
            <p>{strings.none}</p>
          </div>
        :
          <div className="box-body table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>{strings.title}</th>
                  <th>{strings.url}</th>
                  <th>{strings.frequency}</th>
                  <th>{strings.last_status}</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>{linksList}</tbody>
            </table>
          </div>
      }
    </div>
  );
};

LinkList.propTypes = {
  links: PropTypes.array.isRequired,
};

export default LinkList;
