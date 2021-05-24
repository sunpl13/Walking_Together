import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { debounce } from "lodash";

import { logoutHandler } from '../modules/user';

import Menu from './Menu/Menu';
import UserInfo from './User-info/UserInfo';
import UserActivity from './User-activity/UserActivity';
import UserActivityDetail from './User-activity/UserActivityDatail';
import PartnerInfo from './Partner-info/PartnerInfo';
import Notice from './Notice/Notice';
import NoticeInsert from './Notice/NoticeInsert';
import NoticeUpdate from './Notice/NoticeUpdate';
import NoticeDetail from './Notice/NoticeDetail';

import '../styles/admin.scss';

const Admin = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    //function
    const logout = debounce(() => {  //logout
            if(window.confirm("로그아웃 하시겠습니까?")) {
                
                dispatch(logoutHandler());
                if(window.confirm("로그아웃이 완료 되었습니다.")) {
                    history.push('/login');
            }
        }
    }, 800);

    return (
        <div>
            <div id="menu">
                <Menu/>
            </div>

            <div id="userInfo">
                <button onClick={logout} className="admin_logout_btn">로그아웃</button>
                <p>관리자님</p>
            </div>

            <div id="route">
                <Switch>
                    <Route path='/admin/notice' component={Notice} />
                    <Route path='/admin/notice-insert' component={NoticeInsert} />
                    <Route path='/admin/notice-update' component={NoticeUpdate} />
                    <Route path='/admin/notice-detail/:noticeId' component={NoticeDetail} />
                    <Route path='/admin/user-info' component={UserInfo} />
                    <Route path='/admin/user-activity' component={UserActivity} />
                    <Route path='/admin/user-activity-detail' component={UserActivityDetail} />
                    <Route path='/admin/partner-info' component={PartnerInfo} />
                </Switch>
            </div>
        </div>
    );
};

export default Admin;