import React, { useEffect } from "react";
import "../../styles/activity.scss";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getPartner } from "../../modules/activity";
import { debounce } from "lodash";
import { changeBar } from "../../modules/topbar";
import Comment from "../../utils/Comment";

const ActivityStart = () => {
  const stdId = useSelector(state => state.user.authResult.stdId);

  const history = useHistory();
  const dispatch = useDispatch();

  const onclickHandler = debounce(() => {
    if (window.confirm("활동을 생성하시겠습니까?")) {
      dispatch(getPartner(stdId, history));
    }
  }, 800);

  useEffect(() => {
    dispatch(
      changeBar(
        "null", 
        {
          title: "활동", 
          data: null
        }, 
        "null", 
        "null", 
        "null", 
        "h300"
      )
    );  //상단바 변경
  }, [dispatch])


  return (
    <div id="activityStart">
      <Comment sub="A c t i v i t y" main={"활동을\n시작해요!\n"}/>
      <div id="message">
        <p>활동을 시작하기 전에</p>
        <p>먼저 파트너를 등록해주세요.</p>
        <button onClick={() => history.replace("/user/partner")}>파트너 등록하러 가기</button>
      </div>
      <div id="buttonWrap">
        <button className = "circle" onClick = {onclickHandler}>S T A R T</button>
      </div>
    </div>
  );
};

export default ActivityStart;