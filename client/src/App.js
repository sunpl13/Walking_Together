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
import Ranking from './user/Ranking/Ranking';
import LandingPage from './user/home/LandingPage';
import Mapp from './user/Map/Mapp';
import CertificationAction from './user/Certification/CertificationAction';
import Feed from './user/Feed/Feed';
import FeedDetail from './user/Feed/FeedDetail'
import ActivityRegister from './user/Activity/ActivityRegister';
import MemberStipulation from './user/register/MemberStipulation';
import InfoStipulation from './user/register/InfoStipulation';
import LocationStipulayion from './user/register/LocationStipulation'


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
        <Route exact path="/" component={LandingPage} />
        <Route path="/register" component={Auth(RegisterPage,false)}/>
        <Route path="/mypage" component={Auth(Mypage,true)}/>
        <Route path="/signup" component={Auth(Register,false)}/>
        <Route path="/registerauth" component={Auth(RegisterAuth,false)}/>
        <Route path="/home" component={Auth(Home,true)}/>
        <Route path="/noticelist" component={Auth(UserNotice,true)}/>
        <Route path="/findpassword" component={Auth(FindPassword,false)}/>
        <Route path="/findresult" component={Auth(FindPasswordResult,false)}/>
        <Route path="/partner" component={Auth(Partner,true)}/>
        <Route path="/partner-insert" component={Auth(PartnerInsert,true)}/>
        <Route path="/partner-update/:partnerId" component={Auth(PartnerUpdate,true)}/>
        <Route path="/partner-datail/:partnerId" component={Auth(PartnerDetail,true)}/>
        <Route path="/certification-action" component={Auth(CertificationAction,true)}/>
        <Route path="/ranking" component={Auth(Ranking,true)}/>
        <Route path= "/activitystart" component={ActivityStart}/>
        <Route path= "/viewdetail" component={Auth(Detail,true)}/>
        <Route path= "/createactivity" component={Auth(CreateActivity,true)}/>
        <Route path="/activity-register" component={Auth(ActivityRegister, true)}/>
        <Route path= "/mapp" component={Mapp}/>
        <Route path= "/feed" component={Auth(Feed,true)}/>
        <Route path = "/feeddetail" component={Auth(FeedDetail,true)}/>
        <Route path= "/memberstipulation" component={Auth(MemberStipulation,false)}/>
        <Route path= "/infostipulation" component={Auth(InfoStipulation,false)}/>
        <Route path= "/locationstipulation" component={Auth(LocationStipulayion,false)}/>
        
        
      </Switch>
    
      <div style = {style}><Nav/></div>
    </div>
  )
}

export default App;