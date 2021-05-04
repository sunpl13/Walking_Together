import React, { useEffect } from 'react';
import '../../styles/activity.scss';
import {useHistory} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import { getPartner } from '../../modules/activity';
import { debounce } from "lodash";
import { changeBar } from '../../modules/topbar';


const ActivityStart = () => {

    const stdId = useSelector(state => state.user.isLogin.stdId);

    const history = useHistory();
    const dispatch = useDispatch();

    const onclickHandler = debounce(() => {
        if(window.confirm("활동을 생성하시겠습니까?")) {
            dispatch(getPartner(stdId, history));
        }
    }, 800);

    useEffect(() => {
        dispatch(changeBar("null", {title:"활동", data:null}, "null", "null", "null", "small"));  //상단바 변경
    }, [dispatch])


    return (
        <div id="activityStart">
            <button className = "circle" onClick = {onclickHandler}>Start</button>
            <div id="message">
                ※ 활동 생성 후, 바로 활동이 시작됩니다. ※
            </div>
        </div>
    );
};

export default ActivityStart;