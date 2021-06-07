import React, { useCallback } from 'react';
import { useHistory} from 'react-router-dom';

import {  AiFillTrophy } from "react-icons/ai";
import { BiWalk, BiListCheck } from "react-icons/bi";
import { MdHome } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import '../styles/nav.scss';

function Nav() {
    const history = useHistory();
    const activityId = localStorage.getItem("activityId");

    const goActivity = useCallback(() => {
        if(activityId===null||activityId===0) {
            history.replace('/user/activitystart');
        } else {
            history.replace('/user1/activity');
        }
    }, [activityId, history]);

    const goFeed = useCallback(() => {
        history.replace('/user/feed');
    }, [history]);

    const goHome = useCallback(() => {
        history.replace('/user/home');
    }, [history]);

    const goRanking = useCallback(() => {
        history.replace('/user/ranking');
    }, [history]);

    const goMypage = useCallback(() => {
        history.replace('/user/mypage');
    }, [history]);

    return (
        <nav>
            <div className="navItem">
                <span onClick={goActivity}>
                    <BiWalk size="30"/><br/>
                    <p>활동</p>
                </span>
            </div>

            <div className="navItem">
                <span onClick={goFeed}>
                    <BiListCheck size="30"/><br/>
                    <p>피드</p>
                </span>
            </div>

            <div className="navItem">
                <span onClick={goHome}>
                    <MdHome size="30"/><br/>
                    <p>홈</p>
                </span>
            </div>

            <div className="navItem">
                <span onClick={goRanking}>
                    <AiFillTrophy size="30"/><br/>
                    <p>랭킹</p>
                </span>
            </div>

            <div className="navItem">
                <span onClick={goMypage}>
                    <RiAccountCircleFill size="30"/><br/>
                    <p>마이페이지</p>
                </span>
            </div>
        </nav>
    );
};

export default Nav;