import React, { PureComponent } from 'react'
import { Provider } from 'react-redux'
import 'materialize-css/dist/css/materialize.min.css'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import {
  HOME,
  LOGIN,
  DASHBOARD,
  CREATE_USER,
  UPDATE_USER,
  LIST_USERS,
  RECOVER_PASSWORD,
} from 'constants/paths'

import configureStore from './store/configureStore'
import {
  Home,
  NotFound,
  Login,
  Dashboard,
  CreateUser,
  UpdateUser,
  PrivateRoute,
  ListUsers,
  RecoverPassword,
} from './containers'
import './App.css';

const store = configureStore()

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <div id="main-app" className="container">
          <Router>
            <Switch>
              <Route exact path={HOME} component={Home} />
              <Route exact path={LOGIN} component={Login} />
              <Route exact path={RECOVER_PASSWORD} component={RecoverPassword} />
              <PrivateRoute exact path={DASHBOARD} component={Dashboard} />
              <PrivateRoute exact path={CREATE_USER} component={CreateUser} />
              <PrivateRoute exact path={UPDATE_USER} component={UpdateUser} />
              <PrivateRoute exact path={LIST_USERS} component={ListUsers} />
              <Route component={NotFound}/>
            </Switch>
          </Router>
        </div>
      </Provider>
    )
  }
}

export default App;
