import React from 'react';
import {Link} from 'react-router-dom';

import {  AiFillTrophy } from "react-icons/ai";
import { BiWalk, BiListCheck } from "react-icons/bi";
import { MdHome } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import '../styles/nav.scss';


function Nav() {


    return (
        <nav>
            <div className="navItem">
                <Link to = '/activity'>
                    <BiWalk size="30"/><br/>
                    <p>활동</p>
                </Link>
            </div>

            <div className="navItem">
                <Link to = '/feed' className="navItem">
                    <BiListCheck size="30"/><br/>
                    <p>피드</p>
                </Link>
            </div>

            <div className="navItem">
                <Link to = '/home' className="navItem">
                    <MdHome size="30"/><br/>
                    <p>홈</p>
                </Link>
            </div>

            <div className="navItem">
                <Link to = '/ranking' className="navItem">
                    <AiFillTrophy size="30"/><br/>
                    <p>랭킹</p>
                </Link>
            </div>

            <div className="navItem">
                <Link to = '/mypage' className="navItem">
                    <RiAccountCircleFill size="30"/><br/>
                    <p>마이페이지</p>
                </Link>
            </div>
        </nav>
    )
}

export default Nav
