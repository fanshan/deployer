import React, { PropTypes } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter } from 'react-bootstrap';

import Icon from '../../../../app/components/Icon';

const WebhookDialog = (props) => {
  const {
    visible,
    project,
    commands,
    onHide,
  } = props;

  const optional = commands.filter((command) => {
    return command.optional;
  });

  const strings = {
    title: Lang.get('commands.webhook_help'),
    close: Lang.get('app.close'),
    example: Lang.get('commands.webhook_example'),
    fields: Lang.get('commands.webhook_fields'),
    commit: Lang.get('commands.webhook_commit'),
    branch: Lang.get('commands.webhook_branch'),
    update: Lang.get('commands.webhook_update'),
    reason: Lang.get('commands.webhook_reason'),
    source: Lang.get('commands.webhook_source'),
    optional: Lang.get('commands.webhook_optional'),
    url: Lang.get('commands.webhook_url'),
    curl: Lang.get('commands.webhook_curl'),
    commands: Lang.get('commands.webhook_commands'),
    reason_example: Lang.get('commands.reason_example'),
    services: Lang.get('commands.services'),
    services_description: Lang.get('commands.services_description'),
  };

  const optionalList = (
    <div>
      <h5><strong>{strings.optional}</strong></h5>
      <dl className="dl-horizontal" id="hook_command_ids">

      </dl>
    </div>
  );

  // @if (count($optional))
//
// <dl class="dl-horizontal" id="hook_command_ids">
//   @foreach($optional as $command)
//   <dt><em>{{ $command->id }}</em></dt>
// <dd>{{ $command->name }}</dd>
// @endforeach
// </dl>
// @endif
//

  return (
    <Modal show={visible} onHide={onHide} id="help">
      <ModalHeader closeButton>
        <ModalTitle>
          <Icon fa="question-circle" /> {strings.title}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>{strings.example}</p>
        <h5><strong>{strings.fields}</strong></h5>
        <dl className="dl-horizontal" id="hook_fields">
          <dt><em>commit</em></dt>
          <dd>{strings.commit}</dd>
          <dt><em>branch</em></dt>
          <dd>{strings.branch}</dd>
          <dt><em>update_only</em></dt>
          <dd>{strings.update}</dd>
          <dt><em>reason</em></dt>
          <dd>{strings.reason}</dd>
          <dt><em>source</em></dt>
          <dd>{strings.source}</dd>
          <dt><em>url</em></dt>
          <dd>{strings.url}</dd>
          {optional.length > 0 ? <dt><em>commands</em></dt> : null}
          {optional.length > 0 ? <dd>{strings.commands}</dd> : null}
        </dl>
        { optional.length > 0 ? optionalList : null}
        <h5><strong>{strings.curl}</strong></h5>
        <pre>curl -X POST {project.webhook_url} -d 'reason={strings.reason_example}&amp;branch=master&amp;update_only=true'</pre>
        <hr />
        <h5><strong>{strings.services} - <Icon fa="github" /> Github, <Icon fa="gitlab" /> Gitlab, <Icon fa="bitbucket" /> Bitbucket &amp; Beanstalk</strong></h5>
        <p dangerouslySetInnerHTML={{ __html: strings.services_description }} />
      </ModalBody>
      <ModalFooter>
        <Button className="pull-right" bsStyle="default" onClick={onHide}>{strings.close}</Button>
      </ModalFooter>
    </Modal>
  );
};

WebhookDialog.propTypes = {
  project: PropTypes.object.isRequired,
  commands: PropTypes.array.isRequired,
  onHide: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

WebhookDialog.defaultProps = {
  visible: false,
};

export default WebhookDialog;


