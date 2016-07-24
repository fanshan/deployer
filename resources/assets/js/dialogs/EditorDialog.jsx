import React, { PropTypes } from 'react';
import {
  Alert, Button, Modal, ModalHeader,
  ModalBody, ModalTitle, ModalFooter,
} from 'react-bootstrap';

import Icon from '../app/components/Icon';

const EditorDialog = (props) => {
  const {
    translations,
    visible,
    onHide,
    id,
    fa,
    children,
    hasError,
    handleSubmit,
    fields,
  } = props;

  const strings = {
    save: Lang.get('app.save'),
    delete: Lang.get('app.delete'),
    ...translations,
  };

  const isNew = fields.id.value === '';
  const title = isNew ? strings.create : strings.edit;

  return (
    <Modal show={visible} onHide={onHide} id={id}>
      <ModalHeader closeButton>
        <ModalTitle>
          <Icon fa={fa} /> {title}
        </ModalTitle>
      </ModalHeader>
      <form method="post" onSubmit={handleSubmit}>
        {isNew ? null : <input type="hidden" name="id" {...fields.id} />}
        <input type="hidden" name="project_id" {...fields.project_id} />
        <ModalBody>
          {
            hasError ?
              <Alert bsStyle="danger">
                <Icon className="icon" fa="warning" /> {strings.warning}
              </Alert>
            :
              null
          }
          {children}
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
          <Button bsStyle="primary" type="submit" className="pull-right btn-save">
            <Icon fa="save" /> {strings.save}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

EditorDialog.propTypes = {
  translations: PropTypes.shape({
    edit: PropTypes.string.isRequired,
    create: PropTypes.string.isRequired,
    warning: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  fa: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  visible: PropTypes.bool,
  hasError: PropTypes.bool, // FIXME: Maybe remove this?
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
};

EditorDialog.defaultProps = {
  visible: true,
  hasError: false,
};

export default EditorDialog;
