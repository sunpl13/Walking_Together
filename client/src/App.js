import React from 'react'
import { Route, Switch } from 'react-router-dom';
//인증 가능할 시에 인증
import Auth from './hoc/Auth';
import './styles/app.scss';
// import Nav from './utils/Nav'

//admin
import Admin from './admin/Admin';

//user
import RegisterPage from './user/register/RegisterPage';
import Login from './user/login/Login'
import Register from './user/register/Register';
import RegisterAuth from './user/register/RegisterAuth';
import FindPassword from './user/find/FindPassword';
import FindPasswordResult from './user/find/FindPasswordResult';
import LandingPage from './user/home/LandingPage';
import MemberStipulation from './user/register/MemberStipulation';
import InfoStipulation from './user/register/InfoStipulation';
import LocationStipulayion from './user/register/LocationStipulation';
import User from './user/User';

function App() {

  const style = {
    bottom: "0px",
    left: "0px",
    right:"0px",
    position:"fixed"
  }

  return (
    <div id="app" className="App">
  
      <Switch>
        <Route path="/admin" component={Auth(Admin,true,true)} />
        <Route path="/user" component={Auth(User, true)} />
        <Route path="/login" component={Auth(Login,false)} />
        <Route exact path="/" component={LandingPage} />
        <Route path="/register" component={Auth(RegisterPage,false)}/>
        <Route path="/signup" component={Auth(Register,false)}/>
        <Route path="/registerauth" component={Auth(RegisterAuth,false)}/>
        <Route path="/findpassword" component={Auth(FindPassword,false)}/>
        <Route path="/findresult" component={Auth(FindPasswordResult,false)}/>
        <Route path= "/memberstipulation" component={Auth(MemberStipulation,false)}/>
        <Route path= "/infostipulation" component={Auth(InfoStipulation,false)}/>
        <Route path= "/locationstipulation" component={Auth(LocationStipulayion,false)}/>
        <Route path= "/memberstipulation" component={Auth(MemberStipulation,false)}/>
      </Switch>
    
      {/* <div style = {style}><Nav/></div> */}
    </div>
  )
}

export default App;