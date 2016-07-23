// This is only used by DevTools to populate a list of actions

//export * // TODO: Install the babel stage-2 plugin
import * as App from './app/actions';
import * as Dialogs from './dialogs/actions';
import * as Navigation from './navigation/actions';
import * as Project from './project/actions';
import * as Socket from './socket/actions';

export {
  App,
  Dialogs,
  Navigation,
  Project,
  Socket,
};
