import { connect } from 'react-redux';

import * as constants from '../constants';
import FileTab from '../components/files/FileTab';

const mapStateToProps = (state) => ({
  sharedFiles: state.getIn([constants.NAME, 'sharedFiles']).toJS(),
  projectFiles: state.getIn([constants.NAME, 'projectFiles']).toJS(),
  fetching: state.getIn([constants.NAME, 'fetching']),
});

export default connect(mapStateToProps)(FileTab);
