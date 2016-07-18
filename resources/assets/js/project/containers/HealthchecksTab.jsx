import { connect } from 'react-redux';

import * as constants from '../constants';
import HealthcheckTab from '../components/healthchecks/HeathcheckTab';

const mapStateToProps = (state) => ({
  heartbeats: state.getIn([constants.NAME, 'heartbeats']).toJS(),
  links: state.getIn([constants.NAME, 'links']).toJS(),
  fetching: state.getIn([constants.NAME, 'fetching']),
});

export default connect(mapStateToProps)(HealthcheckTab);
