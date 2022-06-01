import React, { useEffect, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectNotice } from "../../modules/notice";
import { changeBar } from "../../modules/topbar";

import  "../../styles/notice.scss";
import ReactHtmlParser from "react-html-parser";

const Detail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation();

  const { 
    title, 
    content,
    createTime,
    imageFiles,
    attachedFiles
  } = useSelector(state => state.noticeReducer.selectedNotice);

  //param function
  const goBack = useCallback(() => {
    history.replace("/user/home");
  }, [history]);

  const dispatchTopbar = useCallback(() => {
    dispatch(
      changeBar(
        "null", 
        { title: title, data: createTime }, 
        "cancel", 
        "null", 
        goBack, 
        "h100"
      )
    );  //상단바 변경
  }, [dispatch, title, createTime, goBack]);
  
  useEffect(() => {
    dispatchTopbar();
    dispatch(selectNotice(state.noticeId));
  },[dispatch, state.noticeId, dispatchTopbar]);

  return (
    <div id="notice">
      <div className = "thumbnail">
        {imageFiles.length !== 0 && <img src = {imageFiles} alt="noticeImage"/> }
      </div>

      <div className = "content">
        {ReactHtmlParser(content)}

        <div className = "files">
          {attachedFiles.length < 1 ? 
            <p id="at_none">첨부파일이 없습니다.</p>
          :
            attachedFiles.map((file, index) => {
              return (
                <div key={index} className="filedown">
                  <a href={file} download>첨부파일{index+1} Download</a>
                  <br />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Detail;