import React from 'react';
import {Link} from 'react-router-dom';


function Nav() {

    //구분을 위한 임시 추후 변경 예정
    const navStyle = {
        textDecoration : 'none',
        color : 'black',
        margin : '30px'
    }


    return (
        <nav>
            <Link style = {navStyle} to = '/activity'>활동</Link>
            <Link style = {navStyle} to = '/feed'>피드</Link>
            <Link style = {navStyle} to = '/home'>홈</Link>
            <Link style = {navStyle} to = '/ranking'>랭킹</Link>
            <Link style = {navStyle} to = '/mypage'>마이페이지</Link>
        </nav>
    )
}

export default Nav
