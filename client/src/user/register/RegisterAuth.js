import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { debounce } from "lodash";
import "../../styles/register.scss";
import Loader from "react-loader-spinner";
import { changeBar } from "../../modules/topbar";
import Comment from "../../utils/Comment";

const RegisterAuth = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [authNum, setauthNum] = useState("");
  const [toggle, settoggle] = useState(false);

  const isabled = authNum.length === 7;

  //인증번호를 통한 본인인증
  const identificationHandler = debounce(() => {
    settoggle(true);
    if (location.state.state === authNum) {
      alert("본인 인증이 완료 되었습니다.");
      settoggle(false);
      history.replace({
        pathname: "/user1/register",
        state: { email: location.state.email },
      });
    } else {
      alert("인증번호가 일치하지 않습니다.");
      settoggle(false);
    }
  }, 800);

  const onChangeHandler = (e) => {
    setauthNum(e.target.value);
  };

  useEffect(() => {
    dispatch(
      changeBar(
        "null",
        { title: "회원가입", data: null },
        "null",
        "null",
        "null",
        "h400"
      )
    ); //상단바 변경
  }, [dispatch]);

  return (
    <div className="register_auth">
      <Comment sub="S i g n - u p" main={"메일로 발송된\n인증코드를\n입력해주세요."}/>

      <div className="e_container">
        <span>" {location.state.email}"</span>
        <span><br/>발송된 메일을 확인해주세요.</span>
      </div>

      <div className="email_container">
        <input
          type="number"
          onChange={onChangeHandler}
          placeholder="인증번호"
        />
        <button
          className={isabled ? "button1" : "button2"}
          disabled={!isabled}
          onClick={identificationHandler}
        >
          {toggle ? (
            <Loader
              type="Oval"
              color="#e2e2e2"
              height={30}
              width={30}
              timeout={3000}
            />
          ) : (
            "인증"
          )}
        </button>
      </div>
    </div>
  );
};

export default RegisterAuth;
