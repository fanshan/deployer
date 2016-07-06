import App from './Containers/App';
import Dashboard from './Containers/Dashboard';
import Profile from './Containers/Profile';

import UserAdmin from './Containers/Admin/Users';
import GroupAdmin from './Containers/Admin/Groups';
import TemplateAdmin from './Containers/Admin/Templates';
import ProjectAdmin from './Containers/Admin/Projects';
import ProjectDetails from './Containers/ProjectDetails';

import { setPageTitle } from './actions/app';

// FIXME: Clean this up
export default function (store) {
  const indexRoute = { component: Dashboard, title: Lang.get('dashboard.title') };

  const childRoutes = [
    { title: 'Update profile', path: 'profile', component: Profile },
    { title: 'Manage users', path: 'admin/users', component: UserAdmin },
    { title: 'Manage groups', path: 'admin/groups', component: GroupAdmin },
    { title: 'Manage deployment templates', path: 'admin/templates', component: TemplateAdmin },
    { title: 'Manage projects', path: 'admin/projects', component: ProjectAdmin },
    { path: 'projects/:id', component: ProjectDetails },
  ];

  // TODO: Is this really the best way to do this?
  const updateTitle = (currentState, nextState) => {
    const title = nextState.routes[nextState.routes.length - 1].title;

    store.dispatch(setPageTitle(title || null));
  };

  childRoutes.map((route) => {
    const localRoute = route;

    localRoute.onChange = updateTitle;

    return localRoute;
  });

  return {
    path: '/',
    component: App,
    indexRoute,
    onChange: updateTitle,
    childRoutes,
  };
}