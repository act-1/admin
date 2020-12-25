export type AppRoute = {
  path: Array<string> | string;
  component: React.ElementType;
  key: string;
  exact: boolean;
};
