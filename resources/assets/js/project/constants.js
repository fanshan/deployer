export const NAME = 'project';

// Possible server statuses
export const SERVER_STATUS_SUCCESSFUL = 0;
export const SERVER_STATUS_UNTESTED = 1;
export const SERVER_STATUS_FAILED = 2;
export const SERVER_STATUS_TESTING = 3;

// Possible deployment statuses
export const DEPLOY_STATUS_COMPLETED = 0;
export const DEPLOY_STATUS_PENDING = 1;
export const DEPLOY_STATUS_DEPLOYING = 2;
export const DEPLOY_STATUS_FAILED = 3;
export const DEPLOY_STATUS_COMPLETED_WITH_ERRORS = 4;
export const DEPLOY_STATUS_ABORTING = 5;
export const DEPLOY_STATUS_ABORTED = 6;

// Possible heartbeat status
export const HEARTBEAT_STATUS_OK = 0;
export const HEARTBEAT_STATUS_UNTESTED = 1;
export const HEARTBEAT_STATUS_MISSING = 2;
