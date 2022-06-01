import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { debounce } from "lodash";
import { FaDownload } from "react-icons/fa"

import { loginHandler } from "../../modules/user";
import { changeBar } from "../../modules/topbar";
import "../../styles/login.scss";
import logo from "../../source/New-logo-white.png";
import TopBar from "../../utils/TopBar";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [stdId, setstdId] = useState("");
  const [Password, setPassword] = useState("");

    useEffect(() => {
    dispatch(
      changeBar(
        "null", 
        { title: "", data: null }, 
        "null", 
        "null", 
        "null", 
        "h500"
      )
    );
  }, [dispatch]);

  const stdIdHandler = (e) => {
    setstdId(e.currentTarget.value);
  }

  const PasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }

  const SubmitHandler = (e) => {
    e.preventDefault();
  }


  const login = debounce(() => {                        //회원정보를 서버에 전송
    dispatch(loginHandler(stdId, Password, history));
  }, 800);

  const goTo = debounce((dest) => {
    history.replace(`/user1/${dest}`);
  }, 800);

  return (
    <div>
    <TopBar/>
    <div className = "login">
      <div className = "logo_container">
        <img src={logo} alt="logo"/>
      </div>
      <form className = "form" onSubmit = {SubmitHandler}>
        <div className = "login_container">
            <input type = "text" value = {stdId} onChange = {stdIdHandler} placeholder = "학번"/>
            <input type = "password" value = {Password} onChange = {PasswordHandler} placeholder = "비밀번호"/>
          <button className = "btn" id = "login_btn" type = "submit" onClick = {login}>로그인</button>       
          <p id = "searchpw_btn" onClick = {() => goTo("findpassword")}>비밀번호를 잊어버리셨나요?</p> 
        </div>
          <button className = "btn" id = "signup_btn" onClick = {() => goTo("signup")}>회원가입</button>
          <div id ="install-button" className = "download" hidden><FaDownload/></div>
      </form>
    </div>
    </div>
  );
}

export default Login;