import axios from 'axios';


const SIGNUP_USER = 'SIGNUP_USER';
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = 'LOGOUT_USER';
const AUTH_USER_PANDING = 'AUTH_USER_PANDING';
const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
const AUTH_USER_FAIL = 'AUTH_USER_FAIL';
const RELOGIN_USER = 'RELOGIN_USER';



//로그인
export const loginHandler = (stdId, password, history) => async(dispatch) => {
    await axios.post('/login', {
        stdId : stdId,
        password : password
    })
    .then((response) => {
        if(response.data.success) {
        if (response.data.token) {
            console.log(response);
            localStorage.setItem("token", response.data.token);                         //유저토큰 로컬스토리지에 user로 저장
            localStorage.setItem("user_info", response.data.stdId);                    //유저정보 user_info로 로컬스토리지에 저장
            dispatch({
                type: LOGIN_USER,
                payload : response.data,
            });
            
            if(window.confirm("환영합니다!")) {
                if(localStorage.getItem("user_info") === "0000000000") {
                    history.push('/admin')
                } else{
                history.push('/user/home')
            }
            }
        } 
        return response.data;
    } else {
        alert("로그인 정보가 일치하지 않습니다.");
        console.log(response);
    }
    })
    .catch(err => console.log(err));
 };

 //비정상종료 학번 리턴
 export const returnStdid = (token) => async(dispatch) => {
    const data = await axios.post('/user1/returnId', {
         token : token
     })
     .then(res => res.data.stdId);

     dispatch({
        type : RELOGIN_USER,
        payload : data
     })
 }

//회원가입
export const signupHanlder = (
    name, 
    email, 
    password, 
    stdId,
    pNumber, 
    birth, 
    department,
    history
) => async(dispatch) => {
     await axios.post('/user1/signup', {
        email : email,
        name : name,
        password : password,
        stdId: stdId,
        pNumber : pNumber,
        birth : birth,
        department : department
    })
    .then((res) =>{
        if(res.data.status === "200") {
            dispatch({
                type : SIGNUP_USER
            })
            if (window.confirm(res.data.message)){
                history.push("/login");
            }
        } else if(res.data.status === "406"){          //학번 중복
            return alert(res.data.message);
        } else if(res.data.status === "407"){           //이메일 중복
            return alert(res.data.message);
        }}
    )
    .catch(err => alert(err)); 
};


//로그아웃
export const logoutHandler = () => async(dispatch) => {
    localStorage.clear();

    await dispatch({
        type : LOGOUT_USER
    });
};

//페이지간 인증
export const authHandler = (option, adminRoute, history) => async(dispatch) => {
    const data = await axios.post('/auth', {token : localStorage.getItem('token')})
    .then(res => res.data)
    .catch(err => console.log(err));


    dispatch({
        type : AUTH_USER_PANDING,
        payload : data
    });

    try{

        dispatch({
            type : AUTH_USER_SUCCESS,
            payload : data
        });
        if(adminRoute === null){
            if(data.isAuth === false) {                 // 토큰이 일치하지 않을 때
                if(option) {
                    alert("로그인을 해주시기 바랍니다.");
                    history.push('/login')
                } else {
                    return ;
                }
            } 
            else if(data.isAuth === true) {           // 로그인이 되었을 때
                if(option) {
                    return;
                } else if(option === false) {
                    alert("접근 권한이 없습니다.")
                    history.push('/user/home');
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
};

const initialstate = {
    isLogin : {},     //로그인 정보를 저장
    result : {},      //회원가입 결과를 저장
    authResult : {},  //인증 결과 저장
    isAuth : false    //인증 결과 저장 (추후 수정 예정)
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
            };
        case AUTH_USER_SUCCESS:
            return {
                ...state,
                authResult : action.payload
            };
        case AUTH_USER_FAIL:
            return {
                ...state,
                authResult : action.payload
            };
        case RELOGIN_USER:
            return {
                ...state,
                isLogin : action.payload
            }
          default :
            return state;
    };
};