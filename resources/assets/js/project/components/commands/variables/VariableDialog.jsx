import React, { PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import EditorDialog from '../../../../dialogs/EditorDialog';

const VariableDialog = (props) => {
  const {
    project,
    variable,
    // errors,
    ...others,
  } = props;

  const strings = {
    name: Lang.get('variables.name'),
    value: Lang.get('variables.value'),
    create: Lang.get('variables.create'),
    edit: Lang.get('variables.edit'),
    warning: Lang.get('variables.warning'),
  };

  // Set the default object state, then merge with the passed in object
  const object = {
    project_id: project.id,
    name: undefined,
    value: undefined,
    ...variable,
  };

  return (
    <EditorDialog id="variable" fa="dollar" translations={strings} item={object} {...others}>
      <FormGroup controlId="variableName">
        <ControlLabel>{strings.name}</ControlLabel>
        <FormControl name="name" defaultValue={object.name} placeholder="COMPOSER_PROCESS_TIMEOUT" />
      </FormGroup>
      <FormGroup controlId="variableValue">
        <ControlLabel>{strings.value}</ControlLabel>
        <FormControl name="value" defaultValue={object.value} placeholder="300" />
      </FormGroup>
    </EditorDialog>
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
