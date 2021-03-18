import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FeedDetail = () => {
    const dispatch = useDispatch();
    const feedItem = useSelector(state => state.feed.selectedFeed);

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

    useEffect(() => {
        
    }, [reviewState])

    return (
        <div>
            {
            <table>
                <tr>
                    <td>활동일</td>
                    <td>{feedItem.activityDate}</td>
                </tr>
                <tr>
                    <td>파트너</td>
                    <td>{feedItem.partnerName}</td>
                </tr>
                <tr>
                    <td>시작시간</td>
                    <td>{feedItem.startTime}</td>
                </tr>
                <tr>
                    <td>종료시간</td>
                    <td>{feedItem.endTime}</td>
                </tr>
                <tr>
                    <td colspan="2">
                        <img src={feedItem.mapPicture} id="mapPicture" alt="mapImage"/>
                    </td>
                </tr>
                <tr>
                    <td>소감문</td>
                    <td>
                        {reviewState==true ? <button onClick={() => updateReview()}>완료</button>
                        : (feedItem.review=="" ? <button onClick={() => setReviewState(!reviewState)}>작성</button> : <button onClick={() => setReviewState(!reviewState)}>수정</button>)
                        }
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        {reviewState==false ?
                        <div>{feedItem.review}</div>
                        :<textarea onChange={reviewChange} placeholder="내용을 입력해주세요." maxlength="250">{feedItem.review}</textarea>}
                    </td>
                </tr>
            </table>
            }
        </div>
    );
};

export default FeedDetail;