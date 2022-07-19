import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { debounce } from "lodash";

import { deleteNotice, getNoticeList } from "../../modules/notice";
import "../../styles/admin.scss";

const NoticeDetail = ({match}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const noticeId = match.params.noticeId;

  const notice = useSelector(state => state.noticeReducer.selectedNotice);


  //action
  const delNotice = debounce(() => {        //공지글 삭제
    dispatch(deleteNotice(noticeId))
    dispatch(getNoticeList(1));
    history.push("/admin/notice");
  },800);

  const goUpdate = debounce(() => {
    history.push("/admin/notice-update");
  }, 800);

  return (
    <div id="noticeDetail">
      <span className="buttonSet">
        <button onClick={goUpdate} className="admin_btn_blue">수정</button>
        <button onClick={delNotice} className="admin_btn_gray">삭제</button>
      </span>

      <div id="title">{notice.title}</div>
      <div id="date">{notice.createTime}</div>

      <div id="content">
        <div id="image">
          {notice.imageFiles.length<1 ? 
            null
          : 
            <img src={notice.imageFiles[0]} alt="error"></img>
          }
        </div>
        {ReactHtmlParser(notice.content)}
      </div>
      <div id="attachedFile">
        <p id="at_title">첨부파일</p>
        {notice.attachedFiles.length < 1 ? 
          <p id="at_none">첨부파일이 없습니다.</p>
          : 
          notice.attachedFiles.map((file, index) => {
            return (
              <div key={index} className="filedown">
                <a href={file} download>{index+1}파일다운</a>
                <br />
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default NoticeDetail;