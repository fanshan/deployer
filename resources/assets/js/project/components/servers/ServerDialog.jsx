import React, { PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import EditorDialog from '../../../dialogs/EditorDialog';

const ServerDialog = (props) => {
  const {
    fields,
    ...others,
  } = props;

  const strings = {
    name: Lang.get('servers.name'),
    value: Lang.get('servers.value'),
    create: Lang.get('servers.create'),
    edit: Lang.get('servers.edit'),
    warning: Lang.get('servers.warning'),
  };

  return (
    <EditorDialog id="servers" fa="tasks" fields={fields} translations={strings} {...others}>
      servers
    </EditorDialog>
  );
};

ServerDialog.propTypes = {
  errors: PropTypes.array,
};

export default ServerDialog;
