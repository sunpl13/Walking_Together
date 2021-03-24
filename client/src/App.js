import React from 'react'
import { Route, Switch } from 'react-router-dom';
//인증 가능할 시에 인증
import Auth from './hoc/Auth';
import './styles/app.scss';
import Nav from './utils/Nav'

//admin
import Admin from './admin/Admin';

//user
import RegisterPage from './user/register/RegisterPage';
import Login from './user/login/Login'
import Mypage from './user/Mypage/Mypage';
import Register from './user/register/Register';
import RegisterAuth from './user/register/RegisterAuth';
import Home from './user/home/Home';
import UserNotice from './user/notice/UserNotice';
import FindPassword from './user/find/FindPassword';
import FindPasswordResult from './user/find/FindPasswordResult';

function App() {

  const style = {
    bottom: "0px",
    left: "0px",
    right:"0px",
    position:"absoulte !important", 
    position:"fixed"
  }

  return (
    <div id="app" className="App">
  
      <Switch>
        <Route path="/admin" component={Admin} />

        <Route path="/login" component={Auth(Login,false)} />
        <Route path="/register" component={Auth(RegisterPage,false)}/>
        <Route path="/mypage" component={Auth(Mypage,true)}/>
        <Route path="/signup" component={Auth(Register,false)}/>
        <Route path="/registerauth" component={Auth(RegisterAuth,false)}/>
        <Route path="/home" component={Auth(Home,true)}/>
        <Route path="/noticelist" component={Auth(UserNotice,true)}/>
        <Route path="/findpassword" component={Auth(FindPassword,false)}/>
        <Route path="/findresult" component={Auth(FindPasswordResult,false)}/>

      </Switch>
    
      <div style = {style}><Nav/></div>
    </div>
  )
}

export default App;