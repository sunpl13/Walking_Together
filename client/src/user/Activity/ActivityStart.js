import React, { useState } from 'react';
import '../../styles/activity.scss';
import TopBar from '../../utils/TopBar';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { getPartner } from '../../modules/activity';

function ActivityStart() {
    const [timer, setTimer] = useState(0); // 디바운싱 타이머

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
        // 디바운싱
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(async () => {
            try {
                if(window.confirm("활동을 생성하시겠습니까?")) {
                    dispatch(getPartner(stdId, history));
                }
            } catch (e) {
                console.error('error', e);
            }
        }, 800);

        setTimer(newTimer);
    };


    return (
        <div>
            <header>
                <TopBar
                    left="null" 
                    center={{title:"활동", data:null}} 
                    right="null" 
                    lfunc={null}
                    rfunc={null}
                    size="small"/>
            </header>
            <div style = {style}>
                <button className = "circle" onClick = {onclickHandler}>Start</button>
            </div>
        </div>
    );
};

export default ActivityStart;