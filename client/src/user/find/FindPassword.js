import { React, useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import { changeBar } from "../../modules/topbar";
import Comment from "../../utils/Comment";
import "../../styles/find.scss";
import { debounce } from "lodash";

const FindPassword = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const [birth, setbirth] = useState("");
  const [stdId, setstdId] = useState("");
  const [Name, setName] = useState("");

  const url = process.env.REACT_APP_SERVER;

  const NameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const stdIdHandler = (e) => {
    setstdId(e.currentTarget.value);
  };

  const findpasswordHandler = debounce(() => {
    axios
    .post(`${url}/findpassword`, {
      stdId: stdId,
      name: Name,
      birth: birth
    })
    .then(res => {
      alert(res.data.message)
      history.replace({
        pathname: '/user1/findresult',
        state: { 
          email: res.data.data.email 
        }
      })
    })
    .catch(err => {
      if (err.response.data.code === 400) {
        alert(err.response.data.message)
      }
    });
  }, 800);

  const goBack = debounce(() => {
    history.replace("/login");
  }, 800);

  useEffect(() => {
    dispatch(
      changeBar(
        "back", 
        { title: "비밀번호 찾기", data: null }, 
        "null", 
        goBack, 
        "null", 
        "h250"
      )
    );  //상단바 변경
  }, [dispatch, goBack])

  return (
    <div className = "find" >
      <Comment sub="F i n d P w" main={"SU-Walk\n비밀번호 찾기"}/>
      <form className = "find_input">
        <div id="formDiv">
          <input type = "text" value = {stdId} onChange = {stdIdHandler} id="input" className="stdId" name="stdId" placeholder="학번"/>
        </div>
        <div id="formDiv">
          <input type = "text" value = {Name} onChange = {NameHandler} id="input" className="name" name="name" placeholder="이름"/>
        </div>
        <div id="formDiv">
          <input type = "date" onChange = {(e)=> {setbirth(moment(e.target.value).format('YYYYMMDD'))}} data-placeholder="생년월일" id="input" className="birth"/>
        </div>
        <button onClick ={findpasswordHandler}>임시 비밀번호 발송</button>
      </form>
    </div>
  );
};

export default FindPassword;