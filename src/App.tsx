import React, { ReactElement } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Routes from '~/src/router'
import Index from '@/layout/index'


const getRoute = (routers: typeof Routes,routes:ReactElement[]=[]) => {

  routers.forEach((item) => {
    if (!item.children) {
      routes.push(<Route exact key={item.path} path={item.path} component={item.component} />)
    } else {
      getRoute(item.children,routes);
    }
  })
  return routes;
}

const App: React.FC<{}> = () => {

  return (
    <Router>
      <Switch>
        <Index>
          {...getRoute(Routes)}
        </Index>
      </Switch>
    </Router>
  )
}

export default App
