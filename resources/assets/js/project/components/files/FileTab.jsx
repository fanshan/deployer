import React, { PropTypes } from 'react';

import PersistentFileList from './persistent/FileList';
import ConfigurationFileList from './/configuration/FileList';
import Loading from '../../../app/components/Loading';

const CommandTab = (props) => {
  const {
    sharedFiles,
    projectFiles,
    fetching,
  } = props;

  if (fetching) {
    return (<Loading visible />);
  }

  return (
    <div>
      <PersistentFileList files={sharedFiles} />
      <ConfigurationFileList files={projectFiles} />
    </div>
  );
};

CommandTab.propTypes = {
  sharedFiles: PropTypes.array.isRequired,
  projectFiles: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default CommandTab;
