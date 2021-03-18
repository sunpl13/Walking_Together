import {React,useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {loginHandler} from './modules/user'
function Login() {
    const dispatch = useDispatch();

    const style = {
        display : "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh"
    }
    const [stdId, setstdId] = useState("");
    const [Password, setPassword] = useState("");

    const stdIdHandler = (e) => {
        setstdId(e.currentTarget.value)
    };

    const PasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    };

    const SubmitHandler =(e) => {
        e.preventDefault();
    };

    const login = () => {                                                //회원정보를 서버에 전송
        // axios.post('/api/login', {
        //     stdId : stdId,
        //     password : Password,
        // })
        // .then((response) => {
        //     if(response.data.success) {
        //     if (response.data.token) {
        //         console.log(response)
        //         localStorage.setItem("token", JSON.stringify(response.data.token));
        //         localStorage.setItem("user_info", JSON.stringify(response.data.stdiId));
        //     } 
        //     return response.data;
        // } else {
        //     alert("로그인 정보가 일치하지 않습니다.")
        //     console.log(response)
        // }
        // });

        dispatch(loginHandler(stdId, Password));
    }

    return (
        <div>
        <div style = {style}>
            <form style = {{display: "flex", flexDirection: "column"}} onSubmit = {SubmitHandler}>
                <label>학번</label>
                <input type = "text" value = {stdId} onChange = {stdIdHandler}/>

                <label>패스워드</label>
                <input type = "password" value = {Password} onChange = {PasswordHandler}/>
                <br/>
                <button type = "submit" onClick = {login}>Login</button>
            </form>
        </div>
        </div>
    )
}

export default Login
