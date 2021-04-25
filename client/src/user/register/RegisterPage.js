import {React, useState} from 'react';
import {signupHanlder} from '../../modules/user';
import {useDispatch} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom' 
import moment from 'moment'
import {option} from '../../utils/options'
import MainContainer from '../../utils/MainContainer'
import '../../styles/register.scss';

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
    const [pNumber, setpNumber] = useState("")

    const depList = option.map(
        item => {
            return ( <option key = {item.label} value = {item.value}>{item.label}</option>)
        }
    )

    const pNumHandler = (e) => {
        setpNumber(e.currentTarget.value)
    };
    const stdIdHandler = (e) => {
        setstdId(e.currentTarget.value)
    };
    const departmentHandler = (e) => {
        setdepartment(e.currentTarget.value)
    };
    const NameHandler = (e) => {
        setName(e.currentTarget.value)
    };
    const PasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    };
    const PasswordConfrimHandler = (e) => {
        setPasswordConfrim(e.currentTarget.value)
    };

    const register = async(e) => {
        e.preventDefault();     
        if(Password === PasswordConfrim) {                    

            dispatch(signupHanlder(Name, Email, Password, stdId, pNumber, birth, department, history));
    } else {
        alert ("두 비밀번호가 일치하지 않습니다.")
    }

}

    return (
        <MainContainer header = {{
                    left : "null",
                    center : {title : "회원가입", data : null},
                    right : "null" ,
                    lfunc : () => null,
                    rfunc : () => null,
                    size :"small"    
        }}>
            <div className = "register_page">
                <form onSubmit ={register}>
                    <input type = "text" value = {Name} onChange = {NameHandler} placeholder = "이름"/>
                    <input type = "text" value = {stdId} onChange = {stdIdHandler} placeholder = "학번"/>
                    <input type = "text" value = {pNumber} onChange = {pNumHandler} placeholder = "휴대폰번호"/>
                    <input type = "date" onChange = {(e)=> {setbirth(moment(e.target.value).format('YYYYMMDD'))}} placeholder = "생년월일"/>
                    <select onChange = {departmentHandler} placeholder = "학과">
                        {depList}
                    </select>
                    <input type = "password" value = {Password} onChange = {PasswordHandler} placeholder = "비밀번호"/>
                    <input type = "Password" value = {PasswordConfrim} onChange = {PasswordConfrimHandler} placeholder = "비밀번호 확인"/>
                    <br/>
                    <button type = "submit">회원가입</button>
                </form>
            </div>
        </MainContainer>
    )
}

export default RegisterPage
