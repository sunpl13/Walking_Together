import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getNoticeList } from '../../modules/notice';
import ReactPaginate from 'react-paginate';

const Notice = () => {
    const dispatch = useDispatch();

    //page
    const pageInfo = useSelector(state => state.notice.pageInfo)

    const changePage = (page) => {
        dispatch(getNoticeList(page))
    }

    const [noticeList, setNoticeList] = useState([])

    useEffect(async () => {
        await dispatch(getNoticeList(pageInfo.page))
        const res = useSelector(state => state.notice.noticeList)
        setNoticeList(res);
    }, [pageInfo])

    return (
        <div>
            <p>test</p>
            <Link to='/notice-action'>글쓰기</Link>
            
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
                                <Link to={`/notice-detail/noticeId=${notice.noticeId}`}>
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
            previousLabel={pageInfo.prev===true ? "이전" : null}
            nextLabel={pageInfo.next===true ? "다음" : null}
            onPageChange={changePage}
            containerClassName={"pagination-ul"}
            activeClassName={"currentPage"}
            previousClassName={"pageLabel-btn"}
            nextClassName={"pageLabel-btn"}
            />
        </div>
    );
};

export default Notice;