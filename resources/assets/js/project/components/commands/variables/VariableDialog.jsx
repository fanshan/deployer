import React, { PropTypes } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter } from 'react-bootstrap';

import Icon from '../../../../app/components/Icon';

const VariableDialog = (props) => {
  const {
    visible,
    project,
    variable,
    onHide,
  } = props;

  const strings = {

  };

  return (
    <Modal show={visible} onHide={onHide} id="help">
      <ModalHeader closeButton>
        <ModalTitle>
          <Icon fa="question-circle" /> {strings.title}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>

      </ModalBody>
      <ModalFooter>
        <Button className="pull-right" bsStyle="default" onClick={onHide}>{strings.close}</Button>
      </ModalFooter>
    </Modal>
  );
};

VariableDialog.propTypes = {
  project: PropTypes.object.isRequired,
  variable: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

VariableDialog.defaultProps = {
  visible: true,
};

export default VariableDialog;


