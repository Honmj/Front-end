import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Index from '@/layout/index';
import Routes from '~/src/router';

const getRoute = (routers: typeof Routes, routes: ReactElement[] = []) => {
  routers.forEach((item) => {
    if (!item.children) {
      routes.push(<Route exact key={item.path} path={item.path} component={item.component} />);
    } else {
      getRoute(item.children, routes);
    }
  });
  return routes;
};

const App: React.FC<{}> = () => (
  <Router>
    <Switch>
      <Index>{...getRoute(Routes)}</Index>
    </Switch>
  </Router>
);

export default App;
