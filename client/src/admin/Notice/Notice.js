import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNoticeList } from "../../modules/notice";
import ReactPaginate from "react-paginate";
import { debounce } from "lodash";
import "../../styles/notice.scss";
import "../../styles/admin.scss";

import { selectNotice, initSelectedNotice } from "../../modules/notice";

const Notice = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //page
  const [current, setCurrent] = useState(0);  //현재 페이지
  const pageInfo = useSelector(state => state.noticeReducer.pageInfo);  //전체 페이지 정보

  const changePage = (page) => {  //pagination 페이지 변경 시 실행
    setCurrent(page.selected);
  };

  const noticeList = useSelector(state => state.noticeReducer.list); //현재 페이지에 띄워질 공지 리스트

  //function
  const dispatchNoticeList = useCallback(() => {  //공지사항 목록 받아오기
    dispatch(getNoticeList(current+1,null));
  },[dispatch, current]);

  //go action
  const goDetail = debounce((noticeId) => {  //공지사항 세부로 이동
    dispatch(selectNotice(noticeId))
    history.push(`/admin/notice-detail/${noticeId}`);
  },800);

  const goAction = debounce(() => {  //공지사항 삽입으로 이동
    dispatch(initSelectedNotice())
    history.push("/admin/notice-insert");
  }, 800);

  //useEffect
  useEffect(() => {
    dispatchNoticeList();
  }, [current, dispatchNoticeList]);

  return (
    <div id="noticeWrap">
      <div id="headerWrap">
        <span className="admin_title" id="title"># 공지사항</span>
        <button onClick={() => goAction()} className="admin_btn_blue" id="write_btn">글쓰기</button>
      </div>

      <table id="noticeTable" className="table">
        <thead>
          <tr>
            <th id="thNo">no</th>
            <th id="thTitle">제목</th>
            <th id="thDate">등록일</th>
          </tr>
        </thead>
        <tbody>
          {noticeList.length !== 0 ?
            noticeList.map((notice) => {
              return (
                <tr key={notice.noticeId} onClick={() => goDetail(notice.noticeId)}>
                  <td>{notice.noticeId}</td>
                  <td>{notice.title}</td>
                  <td>{(notice.date).substring(0,10)}</td>
                </tr>
              )
            })
          : 
            <tr>
              <td colSpan="3">
                등록된 게시물이 없습니다.
              </td>
            </tr>
          }
        </tbody>
        <tfoot></tfoot>
      </table>

      {noticeList !== undefined ?
        <ReactPaginate 
        pageCount={pageInfo.totalPage}  //총 페이지 수
        pageRangeDisplayed={10}  //한 페이지에 표시할 게시글 수
        initialPage={current}  //선택한 초기 페이지
        previousLabel={"이전"}  //이전 라벨
        nextLabel={"다음"}  //다음 라벨
        breakLabel={"..."}  //줄임 라벨
        onPageChange={changePage}  //클릭 할 때 호출 할 메서드
        containerClassName={"pagination-ul"}  //페이지 매김 컨테이너의 클래스 이름
        pageClassName={"page-li"}  //각 페이지 요소의 li태그에 있는 클래스 이름
        activeClassName={"currentPage"}  //활성 페이지의 클래스 이름
        previousClassName={"pageLabel-btn"}  //이전 라벨의 클래스 이름
        nextClassName={"pageLabel-btn"}  //다음 라벨의 클래스 이름
        />
      : null }
    </div>
  );
};

export default Notice;