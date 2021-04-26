import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { debounce } from "lodash";

import { AiFillCloseCircle } from 'react-icons/ai';

const UserActivityDatail = ({match}) => {
    const history = useHistory();

    const [res,setRes] = useState({});
    const activityId = match.params.activityId;

    useEffect(() => {
        axios.get(`/admin/activityInfo/detail?activityId=${activityId}`, {
            headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
        }).then((res) => {
            if(res.data.status===404) {
                alert("존재하지 않는 활동입니다.");
            } else {
                setRes(res.data.data);
            }
        })
    },[activityId]);

    const goBack = debounce(() => {
        history.goBack();
    }, 800);

    return (
        <div id="userActivityDetailWrap">
            <div id="headerWrap">
                <p className="admin_title" id="title"># 활동 상세</p>
                <span id="close" onClick={goBack}><AiFillCloseCircle size="30"/></span>
            </div>

            <table id="userActivityDetailTable">
                <tbody>
                    <tr>
                        <td id="td1">이름</td>
                        <td id="td2">{res.stdName}</td>
                    </tr>
                    <tr>
                        <td id="td1">학과</td>
                        <td id="td2">{res.department}</td>
                    </tr>
                    <tr>
                        <td id="td1">학번</td>
                        <td id="td2">{res.stdId}</td>
                    </tr>
                    <tr>
                        <td id="td1">활동일</td>
                        <td id="td2">{res.activityDate}</td>
                    </tr>
                    <tr>
                        <td id="td1">파트너</td>
                        <td id="td2">{res.partnerName}</td>
                    </tr>
                    <tr>
                        <td id="td1">시작시간</td>
                        <td id="td2">
                            { res.startTime!==null ? res.startTime : "-" }
                        </td>
                    </tr>
                    <tr>
                        <td id="td1">종료시간</td>
                        <td id="td2">
                            { res.endTime!==null ? res.endTime : "-" }
                        </td>
                    </tr>
                    <tr>
                        <td id="td1">소감</td>
                        <td id="td2">{ res.review!==null ? res.review : "봉사자가 소감문을 작성하지 않았습니다."}</td>
                    </tr>
                </tbody>
            </table>
            <div id="mapWrap">
                <p id="mapText">{res.totalDistance}km ({res.totalTime}시간)</p>
                <div id="imageWrap">
                    <img src={res.mapPicture} alt="map"/>
                </div>
            </div>
        </div>
    );
};

export default UserActivityDatail;