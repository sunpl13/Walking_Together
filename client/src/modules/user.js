import axios from "axios";

const SIGNUP_USER = "SIGNUP_USER";
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";
const AUTH_USER_PANDING = "AUTH_USER_PANDING";
const AUTH_USER_SUCCESS = "AUTH_USER_SUCCESS";
const AUTH_USER_FAIL = "AUTH_USER_FAIL";
const RELOGIN_USER = "RELOGIN_USER";

const url = process.env.REACT_APP_SERVER;

//로그인
export const loginHandler = (
  stdId, 
  password, 
  history
) => async (dispatch) => {
  try {
    const res = await axios
    .post(`${url}/login`, {
      stdId: stdId,
      password: password,
    })

    if (res.data.success) {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token); //유저토큰 로컬스토리지에 user로 저장
        dispatch({
          type: LOGIN_USER,
          payload: res.data,
        });

        if (window.confirm("환영합니다!")) {
          if (stdId === "000000") {
            history.replace("/admin/user-info");
          } else {
            history.replace("/user/home");
          }
        }
      }
      return res.data;
    } else {
      alert("로그인 정보가 일치하지 않습니다.");
    }

  } catch (err) {
    console.log(err)
  }
};

//비정상종료 학번 리턴
export const returnStdid = (
  token
) => async (dispatch) => {
  try {
    const res = await axios
    .post(`${url}/returnId`, {
      token: token,
    })

    dispatch({
      type: RELOGIN_USER,
      payload: res,
    });

  } catch(err) {
    console.log(err.response)
  }
};

//회원가입
export const signupHanlder = (
    name,
    email,
    password,
    stdId,
    pNumber,
    birth,
    department,
    history,
    settogle
) => async (dispatch) => {
  try {
    const res = await axios
    .post(`${url}/signup`, {
      email: email,
      name: name,
      password: password,
      stdId: stdId,
      phoneNumber: pNumber,
      birth: birth,
      department: department,
    })

    dispatch({
      type: SIGNUP_USER,
    });
    if (window.confirm(res.data.message)) {
      settogle(false);
      history.replace("/login");
    }

  } catch(err) {
    if (err.response.status === 409) {
      settogle(false);
      alert(err.response.data.message);
    } else if (err.response.status === 410) {
      settogle(false);
      alert(err.response.data.message);
    }
  }
};

//로그아웃
export const logoutHandler = () => async (dispatch) => {
  localStorage.clear();

  await dispatch({
    type: LOGOUT_USER,
  });
};

//페이지간 인증
export const authHandler = (
  option, 
  adminRoute, 
  history
) => async (dispatch) => {
  const data = await axios
  .post(`${url}/auth`, { token: localStorage.getItem("token") })
  .then((res) => res.data)
  .catch((err) => console.log(err));

  dispatch({
    type: AUTH_USER_PANDING,
    payload: data,
  });

  try {
    dispatch({
      type: AUTH_USER_SUCCESS,
      payload: data,
    });
    if (adminRoute === null) {
      if (data.isAuth === false) {
        // 토큰이 일치하지 않을 때
        if (option) {
          alert("로그인을 해주시기 바랍니다.");
          history.replace("/login");
        } else {
          return;
        }
      } else if (data.isAuth === true) {
        // 로그인이 되었을 때
        if (option) {
          return;
        } else if (option === false) {
          alert("접근 권한이 없습니다.");
          history.replace("/user/home");
        }
      }
    } else if (adminRoute === true) {
      if (data.role[0].authority === "ROLE_ADMIN") {
        return;
      } else {
        history.replace("/login");
        alert("접근이 제한되었습니다.");
      }
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: AUTH_USER_FAIL,
      payload: err,
    });
    throw err;
  }
};

const initialstate = {
  isLogin: {}, //로그인 정보를 저장
  result: {}, //회원가입 결과를 저장
  authResult: {}, //인증 결과 저장
  isAuth: false, //인증 결과 저장 (추후 수정 예정)
};

export default function user(state = initialstate, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isLogin: action.payload,
      };
    case SIGNUP_USER:
      return {
        ...state,
        isAuth: false,
      };
    case LOGOUT_USER:
      return initialstate;
    case AUTH_USER_PANDING:
      return {
        ...state,
        authResult: action.payload,
      };
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        authResult: action.payload,
      };
    case AUTH_USER_FAIL:
      return {
        ...state,
        authResult: action.payload,
      };
    case RELOGIN_USER:
      return {
        ...state,
        isLogin: action.payload,
      };
    default:
      return state;
  }
}
