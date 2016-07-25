import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import * as constants from './constants';
import { hideDialog, saveObject } from './actions';

export default (config) => ( // FIXME: How do we validate that both dialog and fields is set?
  (WrappedDialogComponent) => {
    const DialogContainer = (props) => {
      const {
        actions,
        ...others,
      } = props;

      return (
        <WrappedDialogComponent
          onHide={actions.hideDialog}
          {...others}
        />
      );
    };

    DialogContainer.propTypes = {
      actions: PropTypes.object.isRequired,
    };

    const mapStateToProps = (state) => ({
      initialValues: state.getIn([constants.NAME, 'instance']).toJS(),
      visible: (state.getIn([constants.NAME, 'visible']) === config.dialog),
    });

    const mapDispatchToProps = (dispatch) => ({
      actions: bindActionCreators({
        hideDialog: () => (hideDialog(config.dialog)),
      }, dispatch),
    });

    return reduxForm({
      form: config.dialog,
      fields: config.fields,
      onSubmit: saveObject,
      getFormState: (state) => state.get('form').toJS(),
    }, mapStateToProps, mapDispatchToProps)(DialogContainer);
  }
);
