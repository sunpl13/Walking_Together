import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {updateFeed} from '../../modules/feed';
import TopBar from '../../utils/TopBar';

import '../../styles/feed.scss';

function FeedDetail() {
    const dispatch = useDispatch();
    const history = useHistory();

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

    //param function
    function goBack() {
        history.push('/feed')
    }

    return (
        <div>
            <TopBar
            left="back" 
            center={{title:"활동 상세", data:null}} 
            right="null" 
            lfunc={goBack}
            rfunc={null}
            size="small"/>

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
                            <td className="td2">{feedItem.endTime}</td>
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
                            </td>
                        </tr>
                        
                        <tr>
                            <td colSpan="2">
                                {reviewState===false ?
                                    feedItem.review
                                :
                                    <textarea onChange={reviewChange} placeholder="내용을 입력해주세요." maxLength="250" defaultValue={feedItem.review} value={review}></textarea>
                                }     
                            </td>
                        </tr>         
                    </tbody>
                </table>  
            </div>
        </div>
    );
};

export default FeedDetail;