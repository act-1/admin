import { Home, CreateEvent, CreateOrganization, NewPicture } from '../views';

const routes = [
  {
    path: ['/'],
    component: Home,
    key: 'HOME',
    exact: true,
  },
  {
    path: ['/pictures/new'],
    component: NewPicture,
    key: 'NEW_PICTURE',
    exact: true,
  },
  {
    path: ['/events/new'],
    component: CreateEvent,
    key: 'CREATE_EVENT',
    exact: true,
  },
  {
    path: ['/organizations/new'],
    component: CreateOrganization,
    key: 'CREATE_ORGANIZATION',
    exact: true,
  },
];

export default routes;
