import React, { useEffect, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectNotice } from "../../modules/notice";
import { changeBar } from "../../modules/topbar";

import ReactHtmlParser from "react-html-parser";

const Detail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  let view = useSelector(state => state.noticeReducer.selectedNotice);

  //param function
  const goBack = useCallback(() => {
    history.replace("/user/home");
  }, [history]);

  const dispatchTopbar = useCallback(() => {
    dispatch(
      changeBar(
        "null", 
        { title:view.title, data:view.createTime }, 
        "cancel", 
        "null", 
        goBack, 
        "big"
      )
    );  //상단바 변경
  }, [dispatch, view.title, view.createTime, goBack]);
  
  useEffect(() => {
    dispatchTopbar();
    dispatch(selectNotice(location.state.noticeId));
  },[dispatch, location.state.noticeId, dispatchTopbar]);

  return (
    <div id="notice">
      <div className = "thumbnail">
        {view.imageFiles.length!==0 ?
        <img src = {view.imageFiles} alt="noticeImage"/>
        : null }
      </div>

      <div className = "content">
        {ReactHtmlParser(view.content)}
      </div>
      
      <div className = "files">
        {view.attachedFiles.length < 1 ? 
          <p id="at_none">첨부파일이 없습니다.</p>
          : 
          view.attachedFiles.map((file, index) => {
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
  );
};

export default Detail;