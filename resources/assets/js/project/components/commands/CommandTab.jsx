import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

import CommandListComponent from './commands/CommandList';
import VariableList from './variables/VariableList';
import Loading from '../../../app/components/Loading';
import Icon from '../../../app/components/Icon';

const CommandTab = (props) => {
  const {
    project,
    commands,
    variables,
    fetching,
  } = props;

  const strings = {
    webhook: Lang.get('commands.deploy_webhook'),
    generate: Lang.get('commands.generate_webhook'),
  };

  if (fetching) {
    return (<Loading visible />);
  }

  return (
    <div>
      <div className="callout">
        <h4>{strings.webhook} <Icon fa="question-circle" id="show_help" /></h4>
        <code id="webhook">{project.webhook_url}</code>
        <Button bsSize="xsmall" bsStyle="link" id="new_webhook" title={strings.generate}><Icon fa="refresh" /></Button>
      </div>

      <CommandListComponent commands={commands} project={project} />
      <VariableList variables={variables} />
    </div>
  );
};

CommandTab.propTypes = {
  project: PropTypes.object.isRequired,
  commands: PropTypes.array.isRequired,
  variables: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default CommandTab;
