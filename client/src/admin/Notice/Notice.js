import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getNoticeList } from '../../modules/notice';
import ReactPaginate from 'react-paginate';
import '../../styles/notice.scss';

import { selectNotice, initSelectedNotice } from '../../modules/notice';

const Notice = ({history}) => {
    const dispatch = useDispatch();

    //page
    const [current, setCurrent] = useState(0);  //현재 페이지
    const pageInfo = useSelector(state => state.noticeReducer.pageInfo)  //전체 페이지 정보

    const changePage = (page) => {  //pagination 페이지 변경 시 실행
        setCurrent(page.selected)
    }

    const noticeList = useSelector(state => state.noticeReducer.list) //현재 페이지에 띄워질 공지 리스트

    useEffect(() => {
        return (
            dispatch(getNoticeList(current+1,null))  //공지사항 목록 받아오기
        )
    }, [current])

    const goDetail = (noticeId) => {  //공지사항 세부로 이동
        dispatch(selectNotice(noticeId))
        history.push(`/admin/notice-detail/${noticeId}`);
    }

    const goAction = async() => {  //공지사항 액션(삽입)으로 이동
        await dispatch(initSelectedNotice())
        .then(()=>history.push('/admin/notice-action/createpost'))
    }

    return (
        <div>
            <button onClick={()=>goAction()}>글쓰기</button>
            
            <table>
                <tr>
                    <th>no</th>
                    <th>제목</th>
                    <th>등록일</th>
                </tr>
                {
                    noticeList.map((notice) => {
                        return (
                            <tr key={notice.noticeId} onClick={() => goDetail(notice.noticeId)}>
                                <td>{notice.noticeId}</td>
                                <td>{notice.title}</td>
                                <td>{notice.date}</td>
                            </tr>
                        )
                    })
                }
            </table>

            <ReactPaginate 
            pageCount={pageInfo.totalPage}  //총 페이지 수
            pageRangeDisplayed={10}  //한 페이지에 표시할 게시글 수
            initialPage={current}  //선택한 초기 페이지
            previousLabel={"이전"}  //이전 라벨
            nextLabel={"다음"}  //다음 라벨
            onPageChange={changePage}  //클릭 할 때 호출 할 메서드
            containerClassName={"pagination-ul"}  //페이지 매김 컨테이너의 클래스 이름
            pageClassName={"page-li"}  //각 페이지 요소의 li태그에 있는 클래스 이름
            activeClassName={"currentPage"}  //활성 페이지의 클래스 이름
            previousClassName={"pageLabel-btn"}  //이전 라벨의 클래스 이름
            nextClassName={"pageLabel-btn"}  //다음 라벨의 클래스 이름
            />
        </div>
    );
};

export default Notice;