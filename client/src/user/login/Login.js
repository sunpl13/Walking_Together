import {React,useState} from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router';
import {loginHandler} from '../../modules/user';
import '../../styles/login.scss';
function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [timer, setTimer] = useState(0); // 디바운싱 타이머

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


    const login = () => {                                                //회원정보를 서버에 전송
        // 디바운싱
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(async () => {
            try {
                dispatch(loginHandler(stdId, Password, history));
            } catch (e) {
                console.error('error', e);
            }
        }, 800);

        setTimer(newTimer);
    };

    const goSignup = () => {
        // 디바운싱
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(async () => {
            try {
                history.push('/signup');
            } catch (e) {
                console.error('error', e);
            }
        }, 800);

        setTimer(newTimer);
    }

    const goFindPw = () => {
        // 디바운싱
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(async () => {
            try {
                history.push('/findpassword');
            } catch (e) {
                console.error('error', e);
            }
        }, 800);

        setTimer(newTimer); 
    }

    return (
        <div>
            <div className = "login">
                <div className = "logo_container">
                    <span className = "walking"><p>W</p>alking</span>
                    <span className = "together"><p>T</p>ogether</span>
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
        </div>
    );
};

export default Login;