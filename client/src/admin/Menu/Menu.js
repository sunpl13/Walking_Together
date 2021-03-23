import React from 'react';
import { Link } from "react-router-dom";

import '../../styles/menu.scss';

const Menu = () => {

    return (
        <div>
            <Link to='/admin'><img src="" id="logo" alt="로고이미지"/></Link>
            <div id="link">
                <ul>
                    <li><Link to='/admin/user-info'>회원 정보</Link></li>
                    <li><Link to='/admin/user-activity'>회원 활동</Link></li>
                    <li><Link to='/admin/partner-info'>파트너 정보</Link></li>
                    <li><Link to='/admin/notice'>공지사항</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Menu;