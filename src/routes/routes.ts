import { Home, CreatePost } from '../views';

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
];

export default routes;
