import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Menu from './Menu/Menu';
import UserInfo from './User-info/UserInfo';
import UserActivity from './User-activity/UserActivity';
import PartnerInfo from './Partner-info/PartnerInfo';
import Notice from './Notice/Notice';
import NoticeAction from './Notice/NoticeAction';
import NoticeDetail from './Notice/NoticeDetail';

const Admin = () => {

    return (
        <div>
            <div id="menu">
                <Menu/>
            </div>

            <div id="userInfo">
                <button>로그아웃</button>
                <p>홍길동님</p>
            </div>

            <div id="route">
                <Switch>
                    <Route path='/admin/notice' component={Notice} />
                    <Route path='/admin/notice-action/:type' component={NoticeAction} />
                    <Route path='/admin/notice-detail/:noticeId' component={NoticeDetail} />
                    <Route path='/admin/user-info' component={UserInfo} />
                    <Route path='/admin/user-activity' component={UserActivity} />
                    <Route path='/admin/partner-info' component={PartnerInfo} />
                </Switch>
            </div>
        </div>
    );
};

export default Admin;