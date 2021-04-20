import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Routes from '~/src/router'
import Index from '@/layout/index'

const  App:React.FC<{}> = () => {

  return (
    <Router>
        {Routes.map((item:{path:string,component: React.FC})=> (
          <Route exact key={item.path} path={item.path}>
            <Index>
              <item.component />
            </Index>
            
          </Route>
        )
        )}
    </Router>
  )
}

export default App
