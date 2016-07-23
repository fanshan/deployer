import React, { PropTypes } from 'react';
import {
  FormGroup, FormControl, ControlLabel, Alert, Button,
  Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter,
} from 'react-bootstrap';

import Icon from '../../../../app/components/Icon';

// FIXME: Make editor dialog
const VariableDialog = (props) => {
  const {
    visible,
    project,
    variable,
    onHide,
    hasError,
    errors,
  } = props;

  const strings = {
    create: Lang.get('variables.create'),
    edit: Lang.get('variables.edit'),
    save: Lang.get('app.save'),
    delete: Lang.get('app.delete'),
    warning: Lang.get('variables.warning'),
    name: Lang.get('variables.name'),
    value: Lang.get('variables.value'),
  };

  // Set the default object state, then merge with the passed in object
  const object = {
    project_id: project.id,
    name: undefined,
    value: undefined,
    ...variable,
  };

  const isNew = (!object.id);
  const title = isNew ? strings.create : strings.edit;

  return (
    <Modal show={visible} onHide={onHide} id="variable">
      <ModalHeader closeButton>
        <ModalTitle>
          <Icon fa="tasks" /> {title}
        </ModalTitle>
      </ModalHeader>
      <form>
        {isNew ? null : <input type="hidden" name="id" value={object.id} readOnly />}
        <input type="hidden" name="project_id" value={object.project_id} readOnly />
        <ModalBody>
          {
            hasError ?
              <Alert bsStyle="danger">
                <Icon className="icon" fa="warning" /> {strings.warning}
              </Alert>
            :
              null
          }
          <FormGroup controlId="variableName">
            <ControlLabel>{strings.name}</ControlLabel>
            <FormControl name="name" defaultValue={object.name} placeholder="COMPOSER_PROCESS_TIMEOUT" />
          </FormGroup>
          <FormGroup controlId="variableValue">
            <ControlLabel>{strings.value}</ControlLabel>
            <FormControl name="value" defaultValue={object.value} placeholder="300" />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          {
            isNew ?
              null
            :
              <Button
                bsStyle="danger"
                className="pull-left btn-delete"
              ><Icon fa="trash" /> {strings.delete}</Button>
          }
          <Button bsStyle="primary" className="pull-right btn-save"><Icon fa="save" /> {strings.save}</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

VariableDialog.propTypes = {
  project: PropTypes.object.isRequired,
  variable: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired,
  errors: PropTypes.array,
  hasError: PropTypes.bool,
  visible: PropTypes.bool,
};

VariableDialog.defaultProps = {
  errors: [],
  visible: true,
  hasError: false,
};

export default VariableDialog;
