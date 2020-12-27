import { Home, CreatePost, CreateEvent } from '../views';

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
];

export default routes;
