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
import Partner from './user/Partner/Partner';
import PartnerInsert from './user/Partner/PartnerInsert';
import PartnerUpdate from './user/Partner/PartnerUpdate';
import PartnerDetail from './user/Partner/PartnerDetail';
import ActivityStart from './user/Activity/ActivityStart';
import Detail from './user/notice/Detail';
import CreateActivity from './user/Activity/CreateActivity';

import CertificationAction from './user/Certification/CertificationAction';

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
        <Route path="/login" component={Auth(Login,false)} />
        <Route path="/register" component={Auth(RegisterPage,false)}/>
        <Route path="/mypage" component={Auth(Mypage,true)}/>
        <Route path="/signup" component={Auth(Register,false)}/>
        <Route path="/registerauth" component={Auth(RegisterAuth,false)}/>
        <Route path="/home" component={Auth(Home,true)}/>
        <Route path="/noticelist" component={Auth(UserNotice,true)}/>
        <Route path="/findpassword" component={Auth(FindPassword,false)}/>
        <Route path="/findresult" component={Auth(FindPasswordResult,false)}/>
        <Route path="/partner" component={Partner}/>
        <Route path="/partner-insert" component={PartnerInsert}/>
        <Route path="/partner-update/:partnerId" component={PartnerUpdate}/>
        <Route path="/partner-datail/:partnerId" component={PartnerDetail}/>
        <Route path="/certification-action" component={Auth(CertificationAction,true)}/>
        <Route path= "/activitystart" component={ActivityStart}/>
        <Route path= "/viewdetail" component={Auth(Detail,true)}/>
        <Route path= "/createactivity" component={Auth(CreateActivity,true)}/>
      </Switch>
    
      <div style = {style}><Nav/></div>
    </div>
  )
}

export default App;