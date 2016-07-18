import React, { PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

import Icon from '../../../../app/components/Icon';

const Variables = (props) => {
  const strings = {
    create: Lang.get('variables.create'),
    label: Lang.get('variables.label'),
    description: Lang.get('variables.description'),
    example: Lang.get('variables.example'),
    name: Lang.get('variables.name'),
    value: Lang.get('variables.value'),
    edit: Lang.get('variables.edit'),
  };

  const { variables } = props;

  const variableList = [];
  variables.forEach((variable) => {
    const id = `variable_${variable.id}`;

    variableList.push(
      <tr key={id} id={id}>
        <td>{variable.name}</td>
        <td>{variable.value}</td>
        <td>
          <ButtonGroup className="pull-right">
            <Button className="btn-edit" title={strings.edit}><Icon fa="edit" /></Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  });

  return (
    <div className="box">
      <div className="box-header">
        <ButtonGroup className="pull-right">
          <Button title={strings.create}><Icon fa="plus" /> {strings.create}</Button>
        </ButtonGroup>

        <h3 className="box-title">{strings.label}</h3>
      </div>

      <div className="box-body">
        <p dangerouslySetInnerHTML={{ __html: strings.description }} />
        <p dangerouslySetInnerHTML={{ __html: strings.example }} />
      </div>

      <div className="box-body table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>{strings.name}</th>
              <th>{strings.value}</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>{variableList}</tbody>
        </table>
      </div>
    </div>
  );
};

Variables.propTypes = {
  variables: PropTypes.array.isRequired,
};

export default Variables;
