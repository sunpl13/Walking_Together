import {React,useState} from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router';
import { debounce } from "lodash";
import {FaDownload} from 'react-icons/fa'

import {loginHandler} from '../../modules/user';
import '../../styles/login.scss';
import logo from '../../source/logo.png';

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [stdId, setstdId] = useState("");
    const [Password, setPassword] = useState("");

    const stdIdHandler = (e) => {
        setstdId(e.currentTarget.value);
    };

    const PasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const SubmitHandler =(e) => {
        e.preventDefault();
    };


    const login = debounce(() => {                                                //회원정보를 서버에 전송
        dispatch(loginHandler(stdId, Password, history));
    }, 800);

    const goSignup = debounce(() => {
        history.push('/user1/signup');
    }, 800);

    const goFindPw = debounce(() => {
        history.push('/user1/findpassword');
    }, 800);

    return (
        <div>
            <div className = "login">
                <div className = "logo_container">
                    <img src={logo} alt="logo"/>
                </div>
                <form className = "form" onSubmit = {SubmitHandler}>
                    <div className = "login_container">
                            <input type = "text" value = {stdId} onChange = {stdIdHandler} placeholder = "학번"/>
                            <input type = "password" value = {Password} onChange = {PasswordHandler} placeholder = "비밀번호"/>
                        <button className = "login_btn" type = "submit" onClick = {login}>Login</button>                
                    </div>
                        <button className = "signup_btn" onClick = {goSignup}>회원가입</button>        
                        <button className = "signup_btn" onClick = {goFindPw}>비밀번호 찾기</button>
                </form>
            </div>
            <div className = "download" hidden><FaDownload/></div>
        </div>
    );
};

export default Login;