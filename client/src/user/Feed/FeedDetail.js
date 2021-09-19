import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateFeed } from '../../modules/feed';
import { deleteActivity } from '../../modules/activity'
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


    const deleteHandler = useMemo(
        () => debounce(() => {
            if(window.confirm("위 피드의 인정된 시간 및 거리가 영구 삭제되며 복구할 수 없습니다. \n 삭제하시겠습니까?")) {
                dispatch(deleteActivity(feedItem.activityId))
                .then(res => {
                    alert(res.message);
                    const lastIdx = localStorage.getItem("lastIndex");

                    localStorage.removeItem("distance");
                    localStorage.removeItem("activityId");
                    localStorage.removeItem("lastIndex");
                    localStorage.removeItem("partnerId");

                    for(let i=0; i<= lastIdx; i++){
                        localStorage.removeItem("location"+i);
                    }

                    history.replace('/user/feed')
                });
            }
        }, 800)
    , [dispatch, feedItem.activityId, history]);

    useEffect(() => {
        dispatch(changeBar("back", {title:"활동 상세", data:null}, "delete", debounce(() => history.replace('/user/feed'),800), deleteHandler, "small"));  //상단바 변경

        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const dot = feedItem.mapPicture;
                const point = [];
                if(dot.length > 0) {
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
    }, [feedItem.mapPicture, deleteHandler, dispatch, history, key]);  //dependency에 goBack 추가 시 소감문 state 바뀔 때마다 changeBar dispatch 일어남

    return (
        <div id="feedDetail">
            <table id="activity_detail_table">
                <tbody>
                    <tr>
                        <td className="td1">활동일</td>
                        <td className="td2" colSpan="2">{feedItem.activityDate}</td>
                    </tr>

                    <tr>
                        <td className="td1">파트너</td>
                        <td className="td2" colSpan="2">{feedItem.partnerName}</td>
                    </tr>

                    <tr>
                        <td className="td1">시작 시간</td>
                        <td className="td2" colSpan="2">{(feedItem.startTime).substring(11,19)}</td>
                    </tr>

                    <tr>
                        <td className="td1">종료 시간</td>
                        <td className="td2" colSpan="2">{feedItem.endTime === "알 수 없음" ? feedItem.endTime : (feedItem.endTime).substring(11,19)}</td>
                    </tr>
                    
                    <tr>
                        <td className="td1">경로</td>
                    </tr>

                    <tr>
                        {feedItem.mapPicture.length > 0  ?
                            <td colSpan="3">
                                <div style= {{zIndex:'0'}} id="map" ref={container}/>
                            </td>
                            :
                                <td colSpan = "2" style ={{textAlign : "center"}}>경로를 표시할 수 없습니다.</td>
                        }

                    </tr>

                    <tr>
                        <td className="td1">소감문</td>
                        <td className="td2">
                        {reviewState===true && <button className="user_btn_blue" onClick={() => updateReview()}>완료</button>}
                        {reviewState===false && feedItem.review===null && <button className="user_btn_blue" onClick={() => setReviewState(!reviewState)}>작성</button>}
                        {reviewState===false && feedItem.review!==null && <button className="user_btn_blue" onClick={() => setReviewState(!reviewState)}>수정</button>}
                        </td>
                        <td>
                            {review.length!==0 ? review.length+"/800" : "?/800"}
                        </td>
                    </tr>       
                </tbody>
            </table>
            <div id="textarea">
                {reviewState===false ?
                    feedItem.review
                :
                <div>
                    <textarea className="inputText" onChange={reviewChange} 
                    placeholder="활동을 통해 배운 점, 느낀 점 등을 100자 이상 작성해주세요." 
                    minLength="100" maxLength="800" defaultValue={feedItem.review||''}></textarea>
                </div>
                }
            </div>
        </div>
    );
};

export default FeedDetail;