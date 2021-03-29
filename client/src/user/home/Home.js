import {React, useEffect} from 'react'
import { useHistory } from 'react-router';
import {getNoticeList} from '../../modules/notice';
import {useSelector, useDispatch} from 'react-redux'

function Home() {

    const history = useHistory();
    const dispatch = useDispatch();
    const pages = 1;    //공지사항 최근 페이지를 불러옴

    useEffect(() => {
        dispatch(getNoticeList(pages, null));
        //redux에서 notice데이터를 받아옴
    }, [dispatch])

    const notice = useSelector(state => state.noticeReducer.list);
    console.log(notice)
    //console.log(notice[0].date.substring(0,10));


//화면에 출력하기 위해 map 함수를 활용
const homeNotice = notice.map(
    item => {
   return (
            <tbody key = {item.noticeId}>
                <tr><td>{item.title}사회봉사단 | {item.date.substring(0,10)}</td></tr>
            </tbody>
   )
}
)

console.log(homeNotice)


    return (
        <div>
            <span>Walking Together</span>
            <div>
            <div>
                <span>공지사항</span>
                <button onClick = {() => {history.push('/noticelist')}}> 더보기</button>
            </div>
            <table>
                {homeNotice}
            </table>
            </div>
        </div>
    )
}

export default Home
