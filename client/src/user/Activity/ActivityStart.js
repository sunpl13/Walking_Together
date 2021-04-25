import React from 'react'
import '../../styles/activity-start.scss';
import MainContainer from '../../utils/MainContainer'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import { getPartner } from '../../modules/activity';


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

    const onclickHandler = () => {
        if(window.confirm("활동을 생성하시겠습니까?")) {
            dispatch(getPartner(stdId, history))
        }
    }


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
                <button className = "circle" onClick = {onclickHandler}>시작</button>
            </div>
        </MainContainer>
    )
}

export default ActivityStart
