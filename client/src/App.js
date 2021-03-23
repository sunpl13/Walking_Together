import React from 'react'
import { Route, Switch } from 'react-router-dom';
//인증 가능할 시에 인증
// import Auth from './hoc/Auth';
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

function App() {

  const style = {
    "z-index" : "99",
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
        <Route path="/login" component={Login} />
        <Route path="/register" component={RegisterPage}/>
        <Route path="/mypage" component={Mypage}/>
        <Route path="/signup" component={Register}/>
        <Route path="/registerauth" component={RegisterAuth}/>
      </Switch>
    
      <div style = {style}><Nav/></div>
    </div>
  )
}

export default App;