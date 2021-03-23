import axios from 'axios'


const SIGNUP_USER = 'SIGNUP_USER';
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = 'LOGOUT_USER';
const AUTH_USER = 'AUTH_USER';



//로그인
export const loginHandler = (stdId, password) => async(dispatch) => {
    const data = await axios.post('/login', {
        stdId : stdId,
        password : password
    })
    .then((response) => {
        if(response.data.success) {
        if (response.data.token) {
            console.log(response);
            localStorage.setItem("token", JSON.stringify(response.data.token));                         //유저토큰 로컬스토리지에 user로 저장
            localStorage.setItem("user_info", JSON.stringify(response.data.stdId));                    //유저정보 user_info로 로컬스토리지에 저장
        } 
        return response.data;
    } else {
        alert("로그인 정보가 일치하지 않습니다.")
        console.log(response)
    }
    })
    .catch(err => console.log(err));
    console.log(data)
 
        await dispatch({
            type: LOGIN_USER,
            payload : data,
        });
    } 

//회원가입
export const signupHanlder = (
    name, 
    email, 
    password, 
    stdId, 
    birth, 
    department,
    history
) => async(dispatch) => {
     await axios.post('/signup', {
        email : email,
        name : name,
        password : password,
        stdId: stdId,
        birth : birth,
        department : department
    })
    .then((res) =>{if(res.data.status == 200) {
        dispatch({
            type : SIGNUP_USER
        })
        console.log(res)
         if (window.confirm(res.data.message)){
             history.push("/login")
         }
    } else if(res.data.status == 406){          //학번 중복
        console.log(res);
        return alert(res.data.message)
    } else if(res.data.state == 407){           //이메일 중복
        console.log(res);

        return alert(res.data.message)
    }} 
)
    .catch(err => alert(err)); 
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
export const authHandler = (token) => async(dispatch) => {

    const data = await axios.post('/auth', {token : token})
    console.log(data)

    if(data.data.isAuth === true) {
        await dispatch({
            type : AUTH_USER,
            payload : data
        });
    }
}

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
        case AUTH_USER:
            return {
                ...state,
                authResult : action.payload,
                isAuth : true
            }
          default :
          return state;
}
}
