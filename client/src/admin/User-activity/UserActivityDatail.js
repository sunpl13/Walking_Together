import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { debounce } from "lodash";

import { AiFillCloseCircle } from 'react-icons/ai';

const UserActivityDatail = () => {
    const history = useHistory();

    const container = useRef();

    const url = process.env.REACT_APP_SERVER;
    const key = process.env.REACT_APP_MAP;

    const res = useSelector(state => state.adminReducer.selected_activity);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;
        document.head.appendChild(script);
        
        script.onload = () => {
            window.kakao.maps.load(() => {
                if(res.mapPicture!==null&&res.mapPicture!==undefined) {
                    const dot = res.mapPicture;
                    const point = [];

                    for(let i = 0 ; i < dot.length ; i++) {
                        point.push(new window.kakao.maps.LatLng(dot[i].lat, dot[i].lon));
                    }
                    const options = {
                        center: new window.kakao.maps.LatLng(dot[0].lat, dot[0].lon),  //지도 중심 X,Y좌표 정보를 가지고 있는 객체 생성
                        level: 5,  //확대 수준, 작을수록 범위 좁아짐
                    }

                    const map = new window.kakao.maps.Map(container.current, options);  //지도 생성

                    const makerPosition = new window.kakao.maps.LatLng(dot[0].lat, dot[0].lon);  //시작 마커 위치
                    const marker = new window.kakao.maps.Marker({   //마커 생성
                        position: makerPosition
                    });

                    marker.setMap(map);  // 마커를 지도 위에 표시

                    const polyline = new window.kakao.maps.Polyline({
                        path: point,  //선을 구성하는 좌표배열 (현재 좌표와 이전 좌표)
                        strokeWeight: 4, //두께
                        strokeColor: '#FFAE00', //색상
                        strokeOpacity: 0.7, //불투명도
                        strokeStyle: 'solid', //스타일
                    });
                    polyline.setMap(map);  //경로 지도에 표시
                }
            })
        }
    },[url, key, res.mapPicture]);

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
                    <div id="map" ref={container}/>
                </div>
            </div>
        </div>
    );
};

export default UserActivityDatail;