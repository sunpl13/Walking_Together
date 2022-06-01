import { React, useState, useEffect } from "react";
import { signupHanlder } from "../../modules/user";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import { debounce } from "lodash";
import { option, lim_Specialc } from "../../utils/options";
import { changeBar } from "../../modules/topbar";
import Loader from "react-loader-spinner";
import Comment from '../../utils/Comment';
import "../../styles/register.scss";

function RegisterPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const Email = location.state.email;
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordConfrim, setPasswordConfrim] = useState("");
  const [stdId, setstdId] = useState("");
  const [birth, setbirth] = useState("");
  const [department, setdepartment] = useState("");
  const [pNumber, setpNumber] = useState("");
  const [toggle, settoggle] = useState(false); //스피너 토글
  const [pnumCheck, setpnumCheck] = useState({
    bool: false,
    text: "하이픈(-) 없이 입력해 주세요.",
  });
  const [checkName, setcheckName] = useState({
    //이름 정규식 체크할 상태
    bool: true,
    text: "",
  });
  const [checkpwd, setcheckpwd] = useState({
    //비밀번호 정규식 체크할 상태
    bool: false,
    text: "영문,숫자,특수문자 조합 8자 이상 입력해주세요.",
  });
  const [pwdCheck, setpwdCheck] = useState("");

  const depList = option.map((item) => {
    return (
      <option key={item.label} value={item.value}>
        {item.label}
      </option>
    );
  });

  const isDisabled =
    !checkName.bool ||
    !checkpwd.bool ||
    !(Password === PasswordConfrim) ||
    !pnumCheck.bool;

  const Nameblur = () => {
    if (lim_Specialc.test(Name)) {
      setcheckName({
        bool: false,
        text: "형식에 맞지 않습니다.",
      });
    } else {
      setcheckName({
        bool: true,
        text: "",
      });
    }
  };

  const pnumcheckHandler = () => {
    if (pNumber.length > 9) {
      setpnumCheck({
        bool: true,
        text: "",
      });
    }
  };

  const Passwordblur = () => {
    if (Password.length < 7) {
      setcheckpwd({
        bool: false,
        text: "비밀번호는 최소 8자 이상입니다.",
      });
    } else {
      setcheckpwd({
        bool: true,
        text: "",
      });
    }
  };

  const pwdCheckHandler = () => {
    if (Password === PasswordConfrim) {
      setpwdCheck("");
    } else {
      setpwdCheck("두 비밀번호가 서로 다릅니다.");
    }
  };

  const pNumHandler = (e) => {
    setpNumber(e.currentTarget.value);
  };
  const stdIdHandler = (e) => {
    setstdId(e.currentTarget.value);
  };
  const departmentHandler = (e) => {
    setdepartment(e.currentTarget.value);
  };
  const NameHandler = (e) => {
    setName(e.currentTarget.value);
  };
  const PasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const PasswordConfrimHandler = (e) => {
    setPasswordConfrim(e.currentTarget.value);
  };

  const register = debounce(
    async (e) => {
      settoggle(true);
      e.preventDefault();
      if (Password === PasswordConfrim) {
        dispatch(
          signupHanlder(
            Name,
            Email,
            Password,
            stdId,
            pNumber,
            birth,
            department,
            history,
            settoggle
          )
        );
      } else {
        settoggle(false);
        alert("두 비밀번호가 일치하지 않습니다.");
      }
    },
    800,
    { trailing: false, leading: true }
  );

  useEffect(() => {
    dispatch(
      changeBar(
        "null",
        { title: "회원가입", data: null },
        "null",
        "null",
        "null",
        "h270"
      )
    ); //상단바 변경
  }, [dispatch]);

  return (
    <div className="register_page">
      <Comment sub="S i g n - u p" main={"회원 정보를\n입력해주세요."}/>

      <form onSubmit={register}>
        <input
          type="text"
          value={Name}
          name="name"
          onChange={NameHandler}
          placeholder="이름"
          onBlur={Nameblur}
        />
        <div style={{ fontSize: "14px", color: "orange" }}>{checkName.text}</div>
        <input
          type="number"
          value={stdId}
          onChange={stdIdHandler}
          placeholder="학번"
        />
        <input
          type="text"
          value={pNumber}
          onChange={pNumHandler}
          placeholder="휴대폰번호"
          onBlur={pnumcheckHandler}
        />
        <input
          type="date"
          onChange={(e) => {
            setbirth(moment(e.target.value).format("YYYYMMDD"));
          }}
          placeholder="생년월일"
        />
        <select
          className="inputSelect"
          onChange={departmentHandler}
          placeholder="학과"
        >
          {depList}
        </select>
        <input
          type="password"
          value={Password}
          onChange={PasswordHandler}
          placeholder="비밀번호"
          onBlur={Passwordblur}
        />
        <div style={{ fontSize: "14px", color: "orange", marginBottom: "5px" }}>
          {checkpwd.text}
        </div>
        <input
          type="Password"
          value={PasswordConfrim}
          name="passwordCheck"
          onChange={PasswordConfrimHandler}
          placeholder="비밀번호 확인"
          onBlur={pwdCheckHandler}
        />
        <div style={{ fontSize: "14px", color: "orange" }}>{pwdCheck}</div>
        <br />
        <button
          className={isDisabled ? "button2" : "button1"}
          disabled={isDisabled}
          type="submit"
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
            "회원가입"
          )}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
