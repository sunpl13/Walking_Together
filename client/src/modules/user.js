import axios from 'axios'


const SIGNUP_USER = 'SIGNUP_USER';
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = 'LOGOUT_USER';
const AUTH_USER_PANDING = 'AUTH_USER_PANDING';
const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
const AUTH_USER_FAIL = 'AUTH_USER_FAIL';


//로그인
export const loginHandler = (stdId, password) => async(dispatch) => {
    const data = await axios.post('/api/login', {
        stdId : stdId,
        password : password
    })
    .then((response) => {
        if(response.data.success) {
        if (response.data.token) {
            console.log(response);
            localStorage.setItem("token", JSON.stringify(response.data.token));                         //유저토큰 로컬스토리지에 user로 저장
            localStorage.setItem("user_info", JSON.stringify(response.data.stdiId));                    //유저정보 user_info로 로컬스토리지에 저장
        } 
        return response.data;
    } else {
        alert("로그인 정보가 일치하지 않습니다.")
        console.log(response)
    }
    })
    .catch(err => console.log(err));
    console.log(data)
 
    if(data.success) {
        await dispatch({
            type: LOGIN_USER,
            payload : data,
        });
    } else {
        alert("로그인 정보가 일치하지 않습니다.");
    }
};

//회원가입
export const signupHanlder = (
    email, 
    name, 
    password, 
    stdId, 
    birth, 
    department
) => async(dispatch) => {
    const data = axios.post('/api/signup', {
        email : email,
        name : name,
        password : password,
        stdId: stdId,
        birth : birth,
        department : department
    })
    .then((response) => {console.log(response)})
    .catch(err => alert(err));

    if(data.success) {
        await dispatch({
            type : SIGNUP_USER,
            payload : data
        });
    } else {
        alert("학번 또는 이메일이 중복 되었습니다.")
    }
}

//로그아웃
export const logoutHandler = () => async(dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_info");

    await dispatch({
        type : LOGOUT_USER
    });
}

//페이지간 인증
export const authHandler = (token, option, adminRoute, history) => async(dispatch) => {

    const data = await axios.post('/auth', {token : token})
    .then(res => res.data)
    .catch(err => console.log(err));

<<<<<<< Updated upstream
    if(data.data.isAuth == true) {
        await dispatch({
            type : AUTH_USER,
=======
    dispatch({
        type : AUTH_USER_PANDING,
        payload : data
    });
    try{
        dispatch({
            type : AUTH_USER_SUCCESS,
>>>>>>> Stashed changes
            payload : data
        });
    if(adminRoute === null){
    if(data.isAuth === false) {                 // 토큰이 일치하지 않을 때
        history.push('/login')
        alert("로그인 정보가 유효하지 않습니다.");

    } else if(data.isAuth === null) {           // 로그인 안되어 있을 때
        if(option) {
            alert("로그인을 해주시기 바랍니다.");
            history.push('/login')
        } else if(option === false) {           //둘 다 false일때, 즉 로그인 안된 유저가 들어가도 될 때
            return;
        } else {   
            return;
        }
    } else if(data.isAuth === true) {           // 로그인이 되었을 때
        if(option) {
            return;
        } else if(option === false) {
            history.push('/home');
        } else {
            return;
            }
        }
    } else if(adminRoute === true) {
        if(data.role[0].authority === "ROLE_ADMIN") {
            return ;
        } else {
            history.push('/login');
            alert("접근이 제한되었습니다.")
        }
    }
} catch(err) {
    console.log(err)
    dispatch({
        type: AUTH_USER_FAIL,
        payload : err
    });
    throw err;
}
}

const initialstate = {
    isLogin : {},     //로그인 정보를 저장
    result : {},      //회원가입 결과를 저장
    authResult : {},  //인증 결과 저장
    isAuth : false,    //인증 결과 저장 (추후 수정 예정)
    pending : true,
    error : false
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
                result : action.payload,
                isAuth: false
              };
        case LOGOUT_USER:
            return {
                ...state,
                isAuth : false
            };
        case AUTH_USER_PANDING:
            return {
                ...state,
                authResult : action.payload,
                pending : false,
                error : false
            };
        case AUTH_USER_SUCCESS:
            return {
                ...state,
                authResult : action.payload,
                pending : false
            };
        case AUTH_USER_FAIL:
            return {
                ...state,
                authResult : action.payload,
                pending : true,
                error : true
            }
          default :
          return state;
}
}
