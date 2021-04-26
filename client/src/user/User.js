import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/Auth';
import Nav from '../utils/Nav';
import TopBar from '../utils/TopBar';


import Mypage from './Mypage/Mypage';
import Home from './home/Home';
import UserNotice from './notice/UserNotice';
import Partner from './Partner/Partner';
import PartnerInsert from './Partner/PartnerInsert';
import PartnerUpdate from './Partner/PartnerUpdate';
import PartnerDetail from './Partner/PartnerDetail';
import ActivityStart from './Activity/ActivityStart';
import Detail from './notice/Detail';
import CreateActivity from './Activity/CreateActivity';
import Ranking from './Ranking/Ranking';
import Certification from './Certification/Certification';
import CertificationAction from './Certification/CertificationAction';
import Feed from './Feed/Feed';
import FeedDetail from './Feed/FeedDetail'
import ActivityRegister from './Activity/ActivityRegister';


const User = () => {

    return (
        <div>
            <TopBar/>
            <div id="userRoute">
                <Switch>
                    <Route path="/user/mypage" component={Auth(Mypage,true)}/>
                    <Route path="/user/home" component={Auth(Home,true)}/>
                    <Route path="/user/noticelist" component={Auth(UserNotice,true)}/>
                    <Route path="/user/partner" component={Auth(Partner,true)}/>
                    <Route path="/user/partner-insert" component={Auth(PartnerInsert,true)}/>
                    <Route path="/user/partner-update/:partnerId" component={Auth(PartnerUpdate,true)}/>
                    <Route path="/user/partner-datail/:partnerId" component={Auth(PartnerDetail,true)}/>
                    <Route path="/user/certification" component={Auth(Certification,true)}/>
                    <Route path="/user/certification-action" component={Auth(CertificationAction,true)}/>
                    <Route path="/user/ranking" component={Auth(Ranking,true)}/>
                    <Route path= "/user/activitystart" component={ActivityStart}/>
                    <Route path= "/user/viewdetail" component={Auth(Detail,true)}/>
                    <Route path= "/user/createactivity" component={Auth(CreateActivity,true)}/>
                    <Route path="/user/activity-register" component={Auth(ActivityRegister, true)}/>
                    <Route path= "/user/feed" component={Auth(Feed,true)}/>
                    <Route path = "/user/feeddetail" component={Auth(FeedDetail,true)}/>
                </Switch>
            </div>
            <footer><Nav/></footer>
        </div>
    );
};

export default User;