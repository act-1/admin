import { Home, CreatePost, CreateEvent, CreateOrganization, EventList } from '../views';

const routes = [
  {
    path: ['/'],
    component: Home,
    key: 'HOME',
    exact: true,
  },
  {
    path: ['/feed/new'],
    component: CreatePost,
    key: 'CREATE_POST',
    exact: true,
  },
  {
    path: ['/events/new'],
    component: CreateEvent,
    key: 'CREATE_EVENT',
    exact: true,
  },
  {
    path: ['/events/list'],
    component: EventList,
    key: 'EVENT_LIST',
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
