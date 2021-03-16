import axios from 'axios'


const SIGNUP_USER = 'SIGNUP_USER';
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = 'LOGOUT_USER';


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