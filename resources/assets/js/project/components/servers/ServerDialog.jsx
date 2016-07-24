import React, { PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import EditorDialog from '../../../dialogs/EditorDialog';

const ServerDialog = (props) => {
  const {
    project,
    server,
    // errors,
    ...others,
  } = props;

  const strings = {
    name: Lang.get('servers.name'),
    value: Lang.get('servers.value'),
    create: Lang.get('servers.create'),
    edit: Lang.get('servers.edit'),
    warning: Lang.get('servers.warning'),
  };

  // Set the default object state, then merge with the passed in object
  const object = {
    project_id: project.id,
    ...server,
  };

  return (
    <EditorDialog id="servers" fa="tasks" translations={strings} item={object} {...others}>
      servers
    </EditorDialog>
  );
};

ServerDialog.propTypes = {
  project: PropTypes.object.isRequired,
  server: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired,
  errors: PropTypes.array,
  hasError: PropTypes.bool,
  visible: PropTypes.bool,
};

ServerDialog.defaultProps = {
  errors: [],
  visible: true,
  hasError: false,
};

export default ServerDialog;
