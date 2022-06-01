import { React, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getNoticeList, selectNotice } from "../../modules/notice";
import Comment from "../../utils/Comment";
import { changeBar } from "../../modules/topbar";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";

import Couple_Flatline from "../../source/Couple_Flatline.svg";
import "../../styles/home.scss";

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNoticeList(1, null));  //공지사항 최근 페이지를 불러옴
    dispatch(
      changeBar(
        "null",
        { title: "SU-Walk", date: null },
        "null",
        "null",
        "null",
        "h300"
      )
    ); //상단바 변경
    //redux에서 notice데이터를 받아옴
  }, [dispatch]);

  const notice = useSelector((state) => state.noticeReducer.list);
  const mainNotice = notice.slice(0, 4); //4개만 보여주기 위해 자름
  const [page, setPage] = useState(0);

  const goDetail = debounce(async (noticeId) => {
    await dispatch(selectNotice(noticeId))
    history.replace({
      pathname: "/user/viewdetail",
      state: { noticeId: noticeId },
    });
  }, 800);

  const goNotice = debounce(() => {
    history.replace("/user/noticelist");
  }, 800);

  //화면에 출력하기 위해 map 함수를 활용
  const homeNotice = mainNotice.map(({ 
    noticeId, 
    title,
    date
  }, index) => {
    return (
      <div
        className={page===index ? "notice" : "hidden"}
        id={"body" + index}
        key={noticeId}
        onClick={() => goDetail(noticeId)}
      >
        <p id="title">{title}</p>
        <p id="date">{date.slice(0,10)}</p>
      </div>
    );
  });

  const prev = () => {
    if (page===0) {
      setPage(notice.length-1);
    } else {
      setPage(page-1);
    }
  }

  const next = () => {
    if (page===notice.length-1) {
      setPage(0);
    } else {
      setPage(page+1);
    }
  }

  return (
    <div id="home">
      <Comment sub="N o t i c e" main={"공지사항"}/>
      <button className="btn" onClick={goNotice}>더보기</button>
      <div id="homeWrap">
        <button className="arrowBtn" id="left" onClick={()=>prev()}>&lt;</button>
        <div id="noticeWrap">
          {homeNotice}
          <div id="back"></div>
        </div>
        <button className="arrowBtn" id="right" onClick={()=>next()}>&gt;</button>
        <div id="imageWrap">
          <img src={Couple_Flatline} alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default Home;
