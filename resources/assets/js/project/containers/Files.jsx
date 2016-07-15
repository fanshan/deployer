import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as constants from '../constants';

import PersistentFileList from '../components/persistent/FileList';
import ConfigurationFileList from '../components/configuration/FileList';

const Files = (props) => {
  const {
    sharedFiles,
    projectFiles,
  } = props;

  return (
    <div>
      <PersistentFileList files={sharedFiles} />
      <ConfigurationFileList files={projectFiles} />
    </div>
  );
};

Files.propTypes = {
  sharedFiles: PropTypes.array.isRequired,
  projectFiles: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  sharedFiles: state.getIn([constants.NAME, 'sharedFiles']).toJS(),
  projectFiles: state.getIn([constants.NAME, 'projectFiles']).toJS(),
});

export default connect(mapStateToProps)(Files);
