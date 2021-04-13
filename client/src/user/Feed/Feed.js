import {React, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import {sort} from '../../utils/options';
import {getFeedList, selectFeed} from '../../modules/feed';

import TopBar from '../../utils/TopBar';
import '../../styles/feed.scss';

function Feed() {
    const ID = localStorage.getItem("user_info");
    const history = useHistory();
    const dispatch = useDispatch();
    const [sor, setsor] = useState("desc");             // 정렬을 위한 state 지정

    useEffect(() => {
        dispatch(getFeedList(ID,sor))
    },[sor,ID,dispatch])

    let myFeed = useSelector(state => state.feedReducer.list);


    const sortList = sort.map(
        item => {
            return ( <option key = {item.label} value = {item.value}>{item.label}</option>)
        }
    );


    const sortHandler = (e) => {
        setsor(e.currentTarget.value)
    }

    
    return (
        <div>
            <TopBar
            left="null" 
            center={{title:"피드", data:null}} 
            right="null" 
            lfunc={null}
            rfunc={null}
            size="small"/>

            <div id="feedWrap">
                <select onChange = {sortHandler}>{sortList}</select>
                <div id="feedItemsWrap">
                    {myFeed ? 
                    myFeed.map(
                        (item,index) => (
                            <table key = {index} onClick = {() => {dispatch(selectFeed(item.activityId)).then(() => history.push('/feeddetail'))}}>
                                <tbody>
                                <tr id="tr1">
                                    <td id="date">{item.activityDate}</td>
                                    <td id="state">{item.activityStatus ? "진행중" : "종료"}</td>
                                </tr>
                                <tr id="tr2">
                                    <td id="distance">{item.distance}m</td>
                                    <td id="name">파트너 {item.partnerName}</td>
                                </tr>
                                </tbody>
                            </table>
                        )
                    ) : "로딩중"     
                }
                </div>
            </div>
        </div>
    )
}

export default Feed
