import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Register from './user/register/Register'

import './styles/app.scss';

//admin
import Admin from './admin/Admin';
import Login from './admin/Login/Login';

//user
import Certification from './user/Certification/Certification';
import Map from './user/Mapsj/Map';

function App() {
  return (
    <div id="app" className="App">
  
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/user/certification" component={Certification} />
        <Route path="/user/map" component={Map} />
      </Switch>

    </div>
  )
}

export default App;