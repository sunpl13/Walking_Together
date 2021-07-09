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


                    //****핑 사이 거리 측정****
                    let drawingFlag = false; // 선이 그려지고 있는 상태
                    let moveLine; // 마우스 움직임에 따라 그려질 선 객체
                    let clickLine // 마우스로 클릭한 좌표로 그려질 선 객체
                    let distanceOverlay; // 선의 거리정보를 표시할 커스텀오버레이
                    let distanceSumOverlay;  //거리정보 총합 표시할 커스텀오버레이
                    let dots = {}; // 클릭할 때마다 클릭 지점과 거리를 표시하는 커스텀 오버레이 배열

                    // 지도에 클릭 이벤트를 등록
                    window.kakao.maps.event.addListener(map, 'click', (mouseEvent) => {

                        const clickPosition = mouseEvent.latLng;// 마우스로 클릭한 위치

                        if (!drawingFlag) {  //선을 그리고있는 상태가 아니면

                            drawingFlag = true;
                            
                            deleteClickLine(); // 선 제거
                            deleteDistnce(); // 커스텀오버레이 제거
                            deleteCircleDot(); // 거리정보 제거
                        
                            // 선 생성, 지도에 표시
                            clickLine = new window.kakao.maps.Polyline({
                                map: map, // 선을 표시할 지도 
                                path: [clickPosition], // 좌표 배열
                                strokeWeight: 3, // 선 두께 
                                strokeColor: '#db4040', // 선 색깔
                                strokeOpacity: 1, // 선 불투명도
                                strokeStyle: 'solid' // 선의 스타일
                            });
                            
                            // 마우스 움직임에 따라 선이 그려질 위치를 표시할 선을 생성
                            moveLine = new window.kakao.maps.Polyline({
                                strokeWeight: 3,
                                strokeColor: '#db4040',
                                strokeOpacity: 0.5, 
                                strokeStyle: 'solid'     
                            });
                        
                            displayCircleDot(clickPosition, 0);  // 클릭한 지점에 대한 정보를 지도에 표시

                                
                        } else { // 선이 그려지고 있는 상태

                            const path = clickLine.getPath(); // 그려지고 있는 선의 좌표 배열을 얻어옴
                            path.push(clickPosition); // 좌표 배열에 클릭한 위치를 추가
                            clickLine.setPath(path); // 다시 선에 좌표 배열을 설정하여 클릭 위치까지 선을 그리도록 설정

                            let distance = Math.round(clickLine.getLength());
                            displayCircleDot(clickPosition, distance);
                        }
                    });
                        
                    // 지도에 마우스무브 이벤트 등록
                    // 선을 그리고있는 상태에서 마우스무브 이벤트가 발생하면 그려질 선의 위치를 동적으로 보여줌
                    window.kakao.maps.event.addListener(map, 'mousemove', (mouseEvent) => {

                        if (drawingFlag){ // 지도 마우스무브 이벤트가 발생했는데 선을 그리고있는 상태이면
                            
                            const mousePosition = mouseEvent.latLng; // 마우스 커서의 현재 위치를 얻어옵니다 

                            const path = clickLine.getPath(); // 마우스 클릭으로 그려진 선의 좌표 배열을 얻어옴
                            
                            // 마우스 클릭으로 그려진 마지막 좌표와 마우스 커서 위치의 좌표로 선을 표시
                            const movepath = [path[path.length-1], mousePosition];
                            moveLine.setPath(movepath);    
                            moveLine.setMap(map);
                            
                            const distance = Math.round(clickLine.getLength() + moveLine.getLength()); // 선의 총 거리를 계산
                            const content = '<div class="dotOverlay distanceInfo">총거리 <span class="number">' + distance + '</span>m</div>'; // 커스텀오버레이에 추가될 내용
                            
                            // 거리정보를 지도에 표시
                            showDistance(content, mousePosition);   
                        }             
                    });                 

                    // 지도에 마우스 오른쪽 클릭 이벤트를 등록
                    // 선을 그리고있는 상태에서 마우스 오른쪽 클릭 이벤트가 발생하면 선 그리기를 종료
                    window.kakao.maps.event.addListener(map, 'rightclick', (mouseEvent) => {

                        if (drawingFlag) { // 지도 오른쪽 클릭 이벤트가 발생했는데 선을 그리고있는 상태이면
                            
                            // 마우스무브로 그려진 선은 지도에서 제거
                            moveLine.setMap(null);
                            moveLine = null;  
                                                        
                            const path = clickLine.getPath(); // 마우스 클릭으로 그린 선의 좌표 배열을 얻어옴
                        
                            if (path.length > 1) { // 선을 구성하는 좌표의 개수가 2개 이상이면

                                // 마지막 클릭 지점에 대한 거리 정보 커스텀 오버레이를 지움
                                if (dots[dots.length-1].distance) {
                                    dots[dots.length-1].distance.setMap(null);
                                    dots[dots.length-1].distance = null;    
                                }

                                const distance = Math.round(clickLine.getLength()); // 선의 총 거리를 계산
                                const content = getTimeHTML(distance); // 커스텀오버레이에 추가될 내용
                                    
                                showDistance(content, path[path.length-1]); // 그려진 선의 거리정보를 지도에 표시
                                
                            } else {
                                // 선을 구성하는 좌표의 개수가 1개 이하이면 
                                // 지도에 표시되고 있는 선과 정보들을 지도에서 제거
                                deleteClickLine();
                                deleteCircleDot(); 
                                deleteDistnce();

                            }
                            
                            drawingFlag = false; // 상태를 false로, 그리지 않고 있는 상태로 변경    
                        }  
                    });    

                    // 클릭으로 그려진 선을 지도에서 제거하는 함수
                    const deleteClickLine = () => {
                        if (clickLine) {
                            clickLine.setMap(null);    
                            clickLine = null;        
                        }
                    }

                    // 그려지고 있는 선의 총거리 정보를 표시,
                    // 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 생성하고 지도에 표시하는 함수
                    const showDistance = (content, position) => {
                        
                        if (distanceOverlay) { // 커스텀오버레이가 생성된 상태이면
                            
                            // 커스텀 오버레이의 위치와 표시할 내용을 설정
                            distanceOverlay.setPosition(position);
                            distanceOverlay.setContent(content);
                            
                        } else { // 커스텀 오버레이가 생성되지 않은 상태이면
                            
                            // 커스텀 오버레이를 생성하고 지도에 표시
                            distanceOverlay = new window.kakao.maps.CustomOverlay({
                                map: map, // 커스텀오버레이를 표시할 지도
                                content: content,  // 커스텀오버레이에 표시할 내용
                                position: position, // 커스텀오버레이를 표시할 위치
                                xAnchor: 0,
                                yAnchor: 0,
                                zIndex: 3  
                            });      
                        }
                    }

                    // 그려지고 있는 선의 총거리 정보와 
                    // 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 삭제하는 함수
                    const deleteDistnce = () => {
                        if (distanceOverlay) {
                            distanceOverlay.setMap(null);
                            distanceOverlay = null;
                        }
                    }

                    // 선이 그려지고 있는 상태일 때 지도를 클릭하면 호출하여 
                    // 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 표출하는 함수
                    const displayCircleDot = (position, distance) => {

                        // 클릭 지점을 표시할 빨간 동그라미 커스텀오버레이를 생성
                        const circleOverlay = new window.kakao.maps.CustomOverlay({
                            content: '<span class="dot"></span>',
                            position: position,
                            zIndex: 1
                        });

                        // 지도에 표시합니다
                        circleOverlay.setMap(map);

                        if (distance > 0) {
                            // 클릭한 지점까지의 그려진 선의 총 거리를 표시할 커스텀 오버레이를 생성
                            distanceSumOverlay = new window.kakao.maps.CustomOverlay({
                                content: '<div class="dotOverlay">거리 <span class="number">' + distance + '</span>m</div>',
                                position: position,
                                yAnchor: 1,
                                zIndex: 2
                            });

                            // 지도에 표시
                            distanceSumOverlay.setMap(map);
                        }

                        // 배열에 추가
                        dots.push({circle:circleOverlay, distance: distanceSumOverlay});
                    }

                    // 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 지도에서 모두 제거하는 함수
                    const deleteCircleDot = () => {
                        let i;

                        for (i = 0; i < dots.length; i++ ){
                            if (dots[i].circle) { 
                                dots[i].circle.setMap(null);
                            }

                            if (dots[i].distance) {
                                dots[i].distance.setMap(null);
                            }
                        }

                        dots = [];
                    }

                    // 총거리 정보, 도보, 자전거 시간 HTML Content를 만들어 리턴하는 함수
                    const getTimeHTML = (distance) => {

                        // 도보의 시속은 평균 4km/h, 도보의 분속은 67m/min
                        let walkkTime = distance / 67 | 0;
                        let walkHour = '', walkMin = '';

                        // 계산한 도보 시간이 60분 보다 크면 시간으로 표시
                        if (walkkTime > 60) {
                            walkHour = '<span class="number">' + Math.floor(walkkTime / 60) + '</span>시간 '
                        }
                        walkMin = '<span class="number">' + walkkTime % 60 + '</span>분'

                        // 자전거의 평균 시속은 16km/h, 자전거의 분속은 267m/min
                        let bycicleTime = distance / 227 | 0;
                        let bycicleHour = '', bycicleMin = '';

                        // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출
                        if (bycicleTime > 60) {
                            bycicleHour = '<span class="number">' + Math.floor(bycicleTime / 60) + '</span>시간 '
                        }
                        bycicleMin = '<span class="number">' + bycicleTime % 60 + '</span>분'

                        // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴
                        let content = '<ul class="dotOverlay distanceInfo">';
                        content += '<li>';
                        content += '<span class="label">총거리</span><span class="number">' + distance + '</span>m';
                        content += '</li>';
                        content += '<li>';
                        content += '<span class="label">도보</span>' + walkHour + walkMin;
                        content += '</li>';
                        content += '<li>';
                        content += '<span class="label">자전거</span>' + bycicleHour + bycicleMin;
                        content += '</li>';
                        content += '</ul>'

                        return content;
                    }
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
                            { res.startTime!==null ? res.startTime.slice(11,19) : "-" }
                        </td>
                    </tr>
                    <tr>
                        <td id="td1">종료시간</td>
                        <td id="td2">
                            { res.endTime!==null ? res.endTime.slice(11,19) : "-" }
                        </td>
                    </tr>
                    <tr>
                        <td id="td1">소감</td>
                        <td id="td2">{ res.review!==null ? res.review : "봉사자가 소감문을 작성하지 않았습니다."}</td>
                    </tr>
                </tbody>
            </table>
            <div id="mapWrap">
                <p id="mapText">{res.totalDistance}m ({res.totalTime}시간)</p>
                <div id="imageWrap">
                    <div id="map" ref={container}/>
                </div>
                <p id="info">* 좌표 간 거리 구하기 *<br/>(두 점 클릭 → 우측 마우스 클릭)</p>
            </div>
        </div>
    );
};

export default UserActivityDatail;