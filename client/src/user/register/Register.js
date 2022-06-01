import axios from "axios";
import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { debounce } from "lodash";
import { lim_email } from "../../utils/options";
import "../../styles/register.scss";
import { changeBar } from "../../modules/topbar";
import Loader from "react-loader-spinner";
import Comment from "../../utils/Comment";

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_SERVER;
  
  const [agree1, setAgree1] = useState(false); //회원정보 동의
  const [agree2, setAgree2] = useState(false); //개인정보 수집 및 이용동의
  const [agree3, setAgree3] = useState(false); //위치정보 동의
  const [email, setemail] = useState("");
  const [toggle, settoggle] = useState(false);
  const [emailState, setemailState] = useState({
    bool: true,
    text: "",
  });
  const isAgreedAll = agree1 && agree2 && agree3;

  const handleCheckAll = (e) => {
    setAgree1(e.target.checked);
    setAgree2(e.target.checked);
    setAgree3(e.target.checked);
  };

  // placeholder so that you can implement your own validation
  const emailLooksValid = email.length > 5;
  const [clickAgain, setClickAgain] = useState(false);
  const isDisabled =
    !isAgreedAll || !emailLooksValid || clickAgain === true || !emailState.bool;

  const clickFunction = debounce(() => {
    setClickAgain(true);
    settoggle(true);
    axios
      .get(`${url}/signup/authNum?email=${email}`)
      .then((res) => {
        alert("인증번호 전송이 완료되었습니다");
        settoggle(false);
        history.replace({
          pathname: "/user1/registerauth",
          state: { state: res.data.data.authNum, email: email },
        });
      })
      .catch((err) => {
        if (err.response.data.code === 409) {
          alert(err.response.data.message);
          settoggle(false);
        }
      });
  }, 800);

  const checkEmail = () => {
    //이메일 정규식 체크
    if (lim_email.test(email)) {
      setemailState({
        bool: true,
        text: "",
      });
    } else {
      setemailState({
        bool: false,
        text: "이메일 형식에 맞지 않습니다.",
      });
    }
  };

  const EmailHandler = (e) => {
    setemail(e.currentTarget.value);
  };

  const goBack = debounce(() => {
    history.replace("/login");
  }, 800);

  useEffect(() => {
    dispatch(
      changeBar(
        "back",
        { title: "회원가입", data: null },
        "null",
        goBack,
        "null",
        "h270"
      )
    ); //상단바 변경
  }, [dispatch, goBack]);

  return (
    <div className="register">
      <Comment sub="S i g n - u p" main={"서비스 약관에\n동의해주세요."}/>

      <div className="check_container">
        <div className="total">
          <div className="total_agree">
            <input
              id="total"
              className="checkbox"
              type="checkbox"
              name="total_agree"
              value="total_agree"
              checked={isAgreedAll}
              onChange={handleCheckAll}
            />
            <label htmlFor="total">전체 동의</label>
          </div>
          <p id="explanation">
            전체동의는 필수 및 선택 정보에 대한 동의도 포함 되어 있으며,
            개별적으로도 동의를 선택하실 수 있습니다. 선택항목에 대한 동의를
            거부하시는 경우에도 서비스는 이용이 가능합니다.
          </p>
        </div>
        <ul id="check_ul">
          <li>
            <div className="check_wrap">
              <input
                id="a1"
                className="checkbox"
                type="checkbox"
                name="agree1"
                value="agree1"
                checked={agree1}
                onChange={(e) => setAgree1(e.target.checked)}
              />
              <label htmlFor="a1">회원 약관</label>
              <div className="go_icon">
                <FaAngleRight
                  onClick={() => {
                    history.replace("/user1/memberstipulation");
                  }}
                  size="24"
                />
              </div>
            </div>
          </li>
          <li>
            <div className="check_wrap">
              <input
                id="a2"
                className="checkbox"
                type="checkbox"
                name="agree2"
                value="agree2"
                checked={agree2}
                onChange={(e) => setAgree2(e.target.checked)}
              />
              <label htmlFor="a2">개인정보 수집 및 이용</label>
              <div className="go_icon">
                <FaAngleRight
                  onClick={() => {
                    history.replace("/user1/infostipulation");
                  }}
                  size="24"
                />
              </div>
            </div>
          </li>
          <li>
            <div className="check_wrap">
              <input
                id="a3"
                className="checkbox"
                type="checkbox"
                name="agree3"
                value="agree3"
                checked={agree3}
                onChange={(e) => setAgree3(e.target.checked)}
              />
              <label htmlFor="a3">위치 정보 이용 동의</label>
              <div className="go_icon">
                <FaAngleRight
                  onClick={() => {
                    history.replace("/user1/locationstipulation");
                  }}
                  size="24"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="email_container">
        <input
          type="email"
          onChange={EmailHandler}
          placeholder="이메일 주소를 입력해주세요."
          onBlur={checkEmail}
        />
        <div style={{ fontSize: "0.8rem", color: "red" }}>
          {emailState.text}
        </div>
        <button
          className={isDisabled ? "button2" : "button1"}
          disabled={isDisabled}
          onClick={clickFunction}
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
            "인증코드 발송"
          )}
        </button>
        <p className="message">입력해주신 이메일 정보는<br/>회원 이메일 정보로 등록됩니다.</p>
      </div>
    </div>
  );
}

export default Register;
