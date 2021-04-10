import {React, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {sort} from '../../utils/options';
import {getFeedList} from '../../modules/feed';

function Feed() {
    const ID = localStorage.getItem("user_info");
    const dispatch = useDispatch();
    const [FeedInfo, setFeedInfo] = useState([]);
    const [sor, setsor] = useState("desc");             // 정렬을 위한 state 지정

    const sortList = sort.map(
        item => {
            return ( <option key = {item.label} value = {item.value}>{item.label}</option>)
        }
    )
    useEffect(() => {
        dispatch(getFeedList(ID,sor))
    }, [])
    
    // let myFeed = useSelector(state => state.)

    const sortHandler = (e) => {
        setsor(e.currentTarget.value)
    }
    console.log(sor)

    const list = FeedInfo.map(
        item => (
            <table key = {item.id}>
                <tr>
                    <td>날짜</td>
                    <td>진행상태</td>
                </tr>
                <tr>
                    <td>3km</td>
                    <td>파트너 명</td>
                </tr>
            </table>
        )
    )
    return (
        <div>
           <select onChange = {sortHandler}>{sortList}</select>
            <button>활동 생성</button>
            <div>
                여기에 list 입력
            </div>
        </div>
    )
}

export default Feed
