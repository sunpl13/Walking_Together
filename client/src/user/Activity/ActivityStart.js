import React from 'react';
import '../../styles/activity.scss';
import {useHistory} from 'react-router-dom';
import MainContainer from '../../utils/MainContainer';

import {useDispatch} from 'react-redux';
import { getPartner } from '../../modules/activity';
import { debounce } from "lodash";


function ActivityStart() {
    const style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "70vh"
    }

    const stdId = localStorage.getItem("user_info");

    const history = useHistory();
    const dispatch = useDispatch();

    const onclickHandler = debounce(() => {
        if(window.confirm("활동을 생성하시겠습니까?")) {
            dispatch(getPartner(stdId, history));
        }
    }, 800);


    return (
        <MainContainer header = {{
            left : "null",
            center : {title : "활동", data : null},
            right : "null" ,
            lfunc : "null",
            rfunc : "null",
            size :"small"
        }}>
            <div style = {style}>
                <button className = "circle" onClick = {onclickHandler}>Start</button>
            </div>
        </MainContainer>
    );
};

export default ActivityStart;