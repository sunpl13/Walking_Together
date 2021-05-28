import React, { useEffect } from 'react';
import '../../styles/activity.scss';
import {useHistory} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import { getPartner } from '../../modules/activity';
import { debounce } from "lodash";
import { changeBar } from '../../modules/topbar';
import axios from 'axios';


const ActivityStart = () => {

    const url = process.env.REACT_APP_SERVER;
    const stdId = useSelector(state => state.user.authResult.stdId);
    const map = [{lat: 37.6440559, lon: 127.11006579999999, timestamp: 1621825328595},
        {lat: 37.6441113, lon: 127.11005929999997, timestamp: 1621825538522},
        {lat: 37.6441113, lon: 127.11005929999997, timestamp: 1621825538921}];


    const history = useHistory();
    const dispatch = useDispatch();

    const aaaa = () => {
        axios.post(`${url}/arrayTest `, {
            map : map})
            .then(res => res.data)
            .catch(err => console.log(err.response))
    }

    // const onclickHandler = debounce(() => {
    //     if(window.confirm("활동을 생성하시겠습니까?")) {
    //         dispatch(getPartner(stdId, history));
    //     }
    // }, 800);

    useEffect(() => {
        dispatch(changeBar("null", {title:"활동", data:null}, "null", "null", "null", "small"));  //상단바 변경
    }, [dispatch])


    return (
        <div id="activityStart">
            <button className = "circle" onClick = {aaaa}>Start</button>
            <div id="message">
                ※ 활동 생성 후, 바로 활동이 시작됩니다. ※
            </div>
        </div>
    );
};

export default ActivityStart;