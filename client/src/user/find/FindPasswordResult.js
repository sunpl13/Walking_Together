import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import "../../styles/find.scss";
import { debounce } from "lodash";
import { changeBar } from "../../modules/topbar";
import Comment from "../../utils/Comment";

const FindPasswordResult = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const goLogin = debounce(() => {
    history.replace("/login");
  }, 800);

  useEffect(() => {
    dispatch(
      changeBar(
        "null", 
        { title: "비밀번호 찾기", data: null }, 
        "null", 
        "null", 
        "null", 
        "h400"
      )
    );  //상단바 변경
  }, [dispatch]);

  return (
    <div className = "find_auth">
      <Comment sub="F i n d P w" main={"임시 비밀번호가\n발송되었습니다."}/>
      
      <div className = "coment">
        <p>로그인 후 반드시 비밀번호를 변경해주세요!</p>
      </div>
      <div className = "e_container">
        <span>" {location.state.email} "</span>
      </div>
      <button className = "find_button" onClick = {goLogin}>로그인하러 가기</button>
    </div>
  );
};

export default FindPasswordResult;