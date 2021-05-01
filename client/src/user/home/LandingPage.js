import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../../styles/landing.scss';
import {finishActivity} from '../../modules/activity';
import moment from 'moment';


function LandingPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            const token = localStorage.getItem("token");
            const lastIdx = localStorage.getItem("lastIndex");

            if(lastIdx === null) {      //로컬스토리지에 활동 index가 없다면, 활동 내역이 없다면
                if(token === null) {
                    history.push('/login');
                } else {
                    history.push('/user/home');
                    }
            } else {
                const location = JSON.parse(localStorage.getItem(`location${lastIdx}`));
                const formData = new FormData();
                formData.append("activityId",localStorage.getItem("activityId"));
                formData.append("distance", Math.ceil(localStorage.getItem("distance")));
                formData.append("endTime", moment(location.timestamp).format('YYYYMMDDHHmmss'));
                formData.append("checkNormalQuit", 1); //정상종료시 0, 비정상 종료시 1

                dispatch(finishActivity(formData))
                .then(() =>{
                    //로컬스토리지 삭제
                    localStorage.removeItem("distance");
                    localStorage.removeItem("activityId");
                    localStorage.removeItem("lastIndex");
                    localStorage.removeItem("partnerId");
                    localStorage.removeItem("location0");
                    localStorage.removeItem(`location${lastIdx}`);

                    if(token === null) {
                        history.push('/login');
                    } else {
                        history.push('/user/home');
                    }
                })
            }
            
        }, 5000);
    }, [history,dispatch]);

    return (
        <div id="landing_back">
            <p id="landing_logo">Walking Together</p>
        </div>
    );
};

export default LandingPage;