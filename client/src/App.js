import React from 'react'
import { Route, Switch } from 'react-router-dom';
//인증 가능할 시에 인증
// import Auth from './hoc/Auth';
import './styles/app.scss';
import Nav from './utils/Nav'

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
      <div style = "z-index:99;bottom:0px;left:0px;right:0px;position:absoulte !important; position:fixed"><Nav/></div>
    </div>
  )
}

export default App;