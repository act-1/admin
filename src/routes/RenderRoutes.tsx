import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppRoute } from '../types/router';
import routes from './routes';

function RouteWithSubRoutes(route: AppRoute) {
  return <Route path={route.path} exact={route.exact} render={(props) => <route.component {...props} />} />;
}

export function RenderRoutes() {
  return (
    <Switch>
      {routes.map((route: AppRoute) => {
        return <RouteWithSubRoutes {...route} />;
      })}
    </Switch>
  );
}
