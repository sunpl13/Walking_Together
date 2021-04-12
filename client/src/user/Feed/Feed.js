import {React, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import {sort} from '../../utils/options';
import {getFeedList, selectFeed} from '../../modules/feed';

function Feed() {
    const ID = localStorage.getItem("user_info");
    const history = useHistory();
    const dispatch = useDispatch();
    const [sor, setsor] = useState("desc");             // 정렬을 위한 state 지정

    useEffect(() => {
        dispatch(getFeedList(ID,sor))
    },[sor,ID,dispatch])

    let myFeed = useSelector(state => state.feedReducer.list.data);


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
           <select onChange = {sortHandler}>{sortList}</select>
            <button>활동 생성</button>
            <div>
                {myFeed ? 
                   myFeed.map(
                    (item,index) => (
                        <table key = {index} onClick = {() => {dispatch(selectFeed(item.activityId))}}>
                            <tbody>
                            <tr>
                                <td>{item.activityDate}</td>
                                <td>{item.activityStatus ? "진행중" : "종료"}</td>
                            </tr>
                            <tr>
                                <td>{item.distance}m</td>
                                <td>{item.partnerName}</td>
                            </tr>
                            </tbody>
                        </table>
                    )
                ) : "로딩중"     
            }
            </div>
        </div>
    )
}

export default Feed
