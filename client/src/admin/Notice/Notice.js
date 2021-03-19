import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getNoticeList } from '../../modules/notice';
import ReactPaginate from 'react-paginate';

const Notice = () => {
    const dispatch = useDispatch();

    //page
    const [current, setCurrent] = useState(1);  //현재 페이지
    const pageInfo = useSelector(state => state.noticeReducer.pageInfo)  //전체 페이지 정보

    const changePage = (page) => {  //pagination 페이지 변경 시 실행
        setCurrent(page)
    }

    const noticeList = useSelector(state => state.noticeReducer.list) //현재 페이지에 띄워질 공지 리스트

    useEffect(() => {
        dispatch(getNoticeList(current))
    }, [current])

    return (
        <div>
            <p>test</p>
            <Link to='/admin/notice-action/insert'>글쓰기</Link>
            
            <table>
                <tr>
                    <th>no</th>
                    <th>제목</th>
                    <th>등록일</th>
                </tr>
                {
                    noticeList.map((notice) => {
                        return (
                            <tr>
                                <Link to={`admin/notice-detail?noticeId=${notice.noticeId}`}>
                                    <td>{notice.noticeId}</td>
                                    <td>{notice.title}</td>
                                    <td>{notice.date}</td>
                                </Link>
                            </tr>
                        )
                    })
                }
            </table>

            <ReactPaginate 
            pageCount={Math.ceil(pageInfo.page / 10)}  //총 게시글 수
            pageRangeDisplayed={10}  //한 페이지에 표시할 게시글 수
            marginPagesDisplayed={1} //여백을 표시 할 페이지 수
            initialPage={1}  //선택한 초기 페이지
            previousLabel={pageInfo.prev===true ? "이전" : null}  //이전 라벨
            nextLabel={pageInfo.next===true ? "다음" : null}  //다음 라벨
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