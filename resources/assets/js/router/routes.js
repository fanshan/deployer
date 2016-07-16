import App from '../app/containers/App';
import Dashboard from '../dashboard/components/Dashboard';
import Profile from '../profile/Profile';

import UserAdmin from '../admin/Users';
import GroupAdmin from '../admin/Groups';
import TemplateAdmin from '../admin/Templates';
import ProjectAdmin from '../admin/Projects';
import ProjectDetails from '../project/containers/Details';

import Deployments from '../project/containers/DeploymentsTab';
import Servers from '../project/containers/ServersTab';
import Commands from '../project/containers/CommandsTab';
import Files from '../project/containers/FilesTab';
import Health from '../project/containers/HealthchecksTab';
import Notifications from '../project/containers/NotificationsTab';

import * as actions from '../app/actions';
import decorateRoutes from './decorator';

const indexRoute = {
  component: Dashboard,
  title: 'dashboard.title',
};

import React from 'react';

const CommandList = () => (<div>commandlist</div>);

const childRoutes = [
  { path: 'profile', component: Profile, title: 'users.update_profile' },
  {
    path: 'projects/:id',
    component: ProjectDetails,
    indexRoute: { component: Deployments },
    childRoutes: [
      { path: 'servers', component: Servers },
      { path: 'commands', component: Commands },
      { path: 'files', component: Files },
      { path: 'notifications', component: Notifications },
      { path: 'health', component: Health },
    ],
  },
  { path: 'projects/:id/commands/:type', component: CommandList },
  {
    path: 'admin',
    childRoutes: [
      { path: 'users', component: UserAdmin, title: 'users.manage' },
      { path: 'groups', component: GroupAdmin, title: 'groups.manage' },
      { path: 'templates', component: TemplateAdmin, title: 'templates.manage' },
      { path: 'projects', component: ProjectAdmin, title: 'projects.manage' },
    ],
  },
];

export default function (store) {
  const updateTitle = (nextState) => {
    const routes = nextState.routes;
    const string = routes[routes.length - 1].title;
    const title = string ? Lang.get(string) : '';

    store.dispatch(actions.setPageTitle(title));
  };

  decorateRoutes(childRoutes, updateTitle);

  return {
    path: '/',
    component: App,
    indexRoute: {
      ...indexRoute,
      onEnter: updateTitle,
    },
    childRoutes,
  };
}
