import React from 'react';
import { Route, Switch } from 'react-router-dom';
//인증 가능할 시에 인증
import Auth from './hoc/Auth';
import './styles/app.scss';

//admin
import Admin from './admin/Admin';

//user
import Login from './user/login/Login';
import LandingPage from './user/home/LandingPage';
import User from './user/User';
import User1 from './user/User1';

function App() {

  return (
    <div id="app" className="App">
  
      <Switch>
        <Route path="/admin" component={Auth(Admin,true,true)} />
        <Route path="/user" component={Auth(User, true)} />
        <Route path="/login" component={Auth(Login,false)} />
        <Route exact path="/" component={LandingPage} />
        <Route path="/user1" component={User1} />
      </Switch>
    </div>
  );
};

export default App;