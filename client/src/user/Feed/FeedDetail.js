import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {updateFeed} from '../../modules/feed';
import TopBar from '../../utils/TopBar';
import { debounce } from "lodash";

import '../../styles/feed.scss';

function FeedDetail() {
    const dispatch = useDispatch();
    const history = useHistory();

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

    //param function
    const goBack = debounce(() => {
        history.push('/user/feed');
    }, 800);

    return (
        <div>
            <header>
                <TopBar
                    left="back" 
                    center={{title:"활동 상세", data:null}} 
                    right="null" 
                    lfunc={goBack}
                    rfunc={null}
                    size="small"/>
            </header>
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
                            <td className="td1">경로 사진</td>
                            <td className="td2">
                                <img src={feedItem.mapPicture} id="mapPicture" alt="mapImage"/>
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
        </div>
    );
};

export default FeedDetail;