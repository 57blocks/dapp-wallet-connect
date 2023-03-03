import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { Switch404 } from './components/Switch404'
import Dashboard from './views/Dashboard'

export const routes: {
  [page: string]: {
    path: string
    isRoot?: boolean
    component: () => React.ReactElement
  }
} = {
  dashboard: {
    path: '/dashboard',
    component: Dashboard,
    isRoot: true,
  },
}

function Router() {
  return (
    <Switch404>
      {Object.values(routes).map((route) => (
        <Route
          key={route.path}
          exact
          path={route.path}
          component={route.component}
        />
      ))}
      <Route exact path='/' render={() => <Redirect to='/dashboard' />} />
    </Switch404>
  )
}

export default Router
