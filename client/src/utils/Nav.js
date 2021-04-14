import React, { useCallback } from 'react';
import { Link, useHistory} from 'react-router-dom';

import {  AiFillTrophy } from "react-icons/ai";
import { BiWalk, BiListCheck } from "react-icons/bi";
import { MdHome } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import '../styles/nav.scss';

function Nav() {
    const history = useHistory()
    const activityId = localStorage.getItem("activityId")

    const goActivity = useCallback(() => {
        if(activityId===null) {
            history.push('/activitystart')
        } else {
            history.push('/activity')
        }
    }, [activityId, history])

    return (
        <nav>
            <div className="navItem">
                <span onClick={goActivity}>
                    <BiWalk size="30"/><br/>
                    <p>활동</p>
                </span>
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
