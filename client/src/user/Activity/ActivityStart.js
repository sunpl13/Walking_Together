import React from 'react'
import '../../styles/activity-start.scss';
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import { getPartner } from '../../modules/activity';

function ActivityStart() {
    const stdId = localStorage.getItem("user_info");

    const history = useHistory();
    const dispatch = useDispatch();

    const onclickHandler = () => {
        if(window.confirm("활동을 생성하시겠습니까?")) {
            dispatch(getPartner(stdId, history))
        }
    }


    return (
        <div>
            <button className = "circle" onClick = {onclickHandler}>시작</button>
        </div>
    )
}

export default ActivityStart
