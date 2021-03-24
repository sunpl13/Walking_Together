import React from 'react'

// import {getNoticeList} from '../../modules/notice';
// import {useSelector} from 'react-redux'
import { useHistory } from 'react-router';
import {getNoticeList} from '../../modules/notice';
import {useSelector} from 'react-redux'

function Home() {

    const history = useHistory();

    /*
    //redux에서 notice데이터를 받아옴
const notice = useSelector(state => state.noticeReducer.pageInfo);

const noticeList = notice.slice(0,3);       //받아온 데이터를 홈에 필요한 갯수만큼 자르기

//화면에 출력하기 위해 map 함수를 활용
const homeNotice = noticeList.pageList.map(
    item => (
    <tr key = "item.notice_id">{item.title}<br/>사회봉사단 | {item.regdate}</tr>
    )
)
*/


    return (
        <div>
            <span>Walking Together</span>
            <div>
            <div>
                <span>공지사항</span>
                <button onClick = {() => {history.push('/noticelist')}}> 더보기</button>
            </div>
            여기에 notice 컴포넌트 넣기
            </div>
        </div>
    )
}

export default Home
