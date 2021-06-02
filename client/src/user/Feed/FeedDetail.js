import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {updateFeed} from '../../modules/feed';
import { debounce } from "lodash";
import { changeBar } from '../../modules/topbar';

import '../../styles/feed.scss';

const FeedDetail = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const container = useRef();

    const key = process.env.REACT_APP_MAP;

    const feedItem = useSelector(state => state.feedReducer.selectedFeed);

    const [reviewState, setReviewState] = useState(false);
    const [review, setReview] = useState("");

    const reviewChange = (e) => {
        setReview(e.target.value)
    };

    const updateReview = debounce(() => {
        if(review.length>=100) {
            dispatch(updateFeed(feedItem.activityId, review))
            .then(() => {
                setReviewState(!reviewState);
            });
        } else {
            alert("소감문을 100자 이상 작성해주세요.");
        }
    }, 800);

    useEffect(() => {
        dispatch(changeBar("back", {title:"활동 상세", data:null}, "null", debounce(() => history.push('/user/feed'),800), "null", "small"));  //상단바 변경

        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const dot = feedItem.mapPicture;
                const point = [];
                if(feedItem.mapPicture!==null&&feedItem.mapPicture!==undefined) {
                    for(let i = 0 ; i < dot.length ; i++) {
                        point.push(new window.kakao.maps.LatLng(dot[i].lat, dot[i].lon));
                    }

                    const options = {
                        center: new window.kakao.maps.LatLng(dot[0].lat, dot[0].lon),  //지도 중심 X,Y좌표 정보를 가지고 있는 객체 생성
                        level: 5,  //확대 수준, 작을수록 범위 좁아짐
                    };

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
    }, [dispatch, feedItem.mapPicture, key, history]);  //dependency에 goBack 추가 시 소감문 state 바뀔 때마다 changeBar dispatch 일어남

    return (
        <div id="feedDetail">
            <table id="activity_detail_table">
                <tbody>
                    <tr>
                        <td className="td1">활동일</td>
                        <td className="td2">{feedItem.activityDate}</td>
                    </tr>

                    <tr>
                        <td className="td1">파트너</td>
                        <td className="td2">{feedItem.partnerName}</td>
                    </tr>

                    <tr>
                        <td className="td1">시작 시간</td>
                        <td className="td2">{(feedItem.startTime).substring(11,19)}</td>
                    </tr>

                    <tr>
                        <td className="td1">종료 시간</td>
                        <td className="td2">{(feedItem.endTime).substring(11,19)}</td>
                    </tr>
                    
                    <tr>
                        <td className="td1">경로</td>
                    </tr>

                    <tr>
                        <td colSpan="2">
                            <div id="map" ref={container}/>
                        </td>
                    </tr>

                    <tr>
                        <td className="td1">소감문</td>
                        <td className="td2">
                        {reviewState===true && <button className="user_btn_blue" onClick={() => updateReview()}>완료</button>}
                        {reviewState===false && feedItem.review===null && <button className="user_btn_blue" onClick={() => setReviewState(!reviewState)}>작성</button>}
                        {reviewState===false && feedItem.review!==null && <button className="user_btn_blue" onClick={() => setReviewState(!reviewState)}>수정</button>}
                        </td>
                    </tr>       
                </tbody>
            </table>
            <div id="textarea">
                {reviewState===false ?
                    feedItem.review
                :
                    <textarea className="inputText" onChange={reviewChange} 
                    placeholder="활동을 통해 배운 점, 느낀 점 등을 100자 이상 작성해주세요." 
                    minLength="100" maxLength="800" defaultValue={feedItem.review}></textarea>
                }     
            </div>
        </div>
    );
};

export default FeedDetail;