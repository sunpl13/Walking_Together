import {React, useEffect} from 'react'
import { useHistory } from 'react-router';
import {getNoticeList, selectNotice} from '../../modules/notice';
import {useSelector, useDispatch} from 'react-redux';
import TopBar from '../../utils/TopBar';
import Couple_Flatline from '../../source/Couple_Flatline.svg';
import '../../styles/home.scss';

function Home() {

    const history = useHistory();
    const dispatch = useDispatch();
    const pages = 1;    //공지사항 최근 페이지를 불러옴

    useEffect(() => {
        dispatch(getNoticeList(pages, null));
        //redux에서 notice데이터를 받아옴
    }, [dispatch])

    const notice = useSelector(state => state.noticeReducer.list);

    const mainNotice = notice.slice(0,4);       //4개만 보여주기 위해 자름

    const goDetail = async(noticeId) => {
        await dispatch(selectNotice(noticeId))
        .then(() => {
            history.push({
                pathname : '/user/viewdetail',
                state : {noticeId : noticeId}
            })
        })
    }


    //화면에 출력하기 위해 map 함수를 활용
    const homeNotice = mainNotice.map(
        (item, index) => {
            return (
                <tbody id={"body"+index} key = {item.noticeId} onClick={() => goDetail(item.noticeId)}>
                    <tr>
                        <td id="title" colSpan="2">{item.title}</td>
                    </tr>
                    <tr>
                        <td id="writer">사회봉사단</td>
                        <td id="date">{item.date.substring(0,10)}</td>
                    </tr>
                </tbody>
            )
        }
    )

    return (
        <div id="home">
            <header>
                <TopBar
                    left="null" 
                    center={{title:"HOME", data:null}} 
                    right="null" 
                    lfunc={null}
                    rfunc={null}
                    size="small"/>
            </header>
            <div id="homeWrap">
                <span id="logo">Walking Together</span>
                <img src={Couple_Flatline} width="250" alt="logo"/>
                
                <div id="noticeWrap">
                    <div id="noticeTop">
                        <span id="noticeTitle"># 공지사항</span>
                        <button className="user_btn_blue" onClick = {() => {history.push('/user/noticelist')}}> 더보기</button>
                    </div>
                    <table id="noticeTable">
                        {homeNotice}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home
