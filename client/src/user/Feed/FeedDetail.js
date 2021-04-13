import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateFeed} from '../../modules/feed'

const FeedDetail = () => {
    const dispatch = useDispatch();
    const feedItem = useSelector(state => state.feedReducer.selectedFeed);

    const [reviewState, setReviewState] = useState(false);
    const [review, setReview] = useState("");

    const reviewChange = (e) => {
        setReview(e.target.value)
    }

    const updateReview = () => {
        dispatch(updateFeed(feedItem.activityId, review))
        .then(() => {
            setReviewState(!reviewState)
        })
    }

    return (
        <div>
            <label>활동일</label>
            <p>{feedItem.activityDate}</p>

            <label>파트너</label>
            <p>{feedItem.partnerName}</p>

            <label>시작 시간</label>
            <p>{(feedItem.startTime).substring(11,19)}</p>
            
            <label>종료 시간</label>
            <p>{feedItem.endTime}</p>
            
            <label>경로 사진</label>
            <img src={feedItem.mapPicture} id="mapPicture" alt="mapImage"/><br/>
            
            <label>소감문</label>
            { () => {
                if(feedItem.endTime!==null) {
                    if(reviewState===true) {
                        return <button onClick={() => updateReview()}>완료</button>
                    }
                    else {
                        if(feedItem.review===null) {
                            return <button onClick={() => setReviewState(!reviewState)}>작성</button>
                        }
                        else {
                            return <button onClick={() => setReviewState(!reviewState)}>수정</button>
                        }
                    }
                } else {
                    return null;
                }
            }}

            {reviewState==false ?
                <div>{feedItem.review}</div>
            :
                <textarea onChange={reviewChange} placeholder="내용을 입력해주세요." maxLength="250" defaultValue={feedItem.review} value={review}></textarea>
            }                
        </div>
    );
};

export default FeedDetail;