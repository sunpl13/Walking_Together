
import {React, useState} from 'react';
import {signupHanlder} from '../../modules/user';
import {useDispatch} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom' 
import moment from 'moment'
import {option} from '../../utils/options'

function RegisterPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    console.log(location)


    const style = {
        display : "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh"
    }


        

    const [Email, setEmail] = useState(location.state.email);
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [PasswordConfrim, setPasswordConfrim] = useState("");
    const [stdId, setstdId] = useState("");
    const [birth, setbirth] = useState("");
    const [department, setdepartment] = useState("");

    const depList = option.map(
        item => {
            return ( <option key = {item.label} value = {item.value}>{item.label}</option>)
        }
    )

    const EmailHandler = (e) => {
        setEmail(e.currentTarget.value)
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

    //      await axios.post('/signup', {
    //      name : Name,
    //      email : Email,
    //      password : Password,
    //      stdId : stdId,
    //      birth : birth,
    //      department : department
    //  })
    //  .then(res => {console.log(typeof res.status)
    // })

            dispatch(signupHanlder(Name, Email, Password, stdId, birth, department,history));
    } else {
        alert ("두 비밀번호가 일치하지 않습니다.")
    }

}

    return (

<div style ={style}>
            <form onSubmit ={register} style = {{display : "flex", flexDirection : "column"}}>
                <label>Email</label>
                <span>{Email}</span>

                <label>Name</label>
                <input type = "text" value = {Name} onChange = {NameHandler}/>

                <label>학번</label>
                <input type = "text" value = {stdId} onChange = {stdIdHandler}/>

                <label>생년월일</label>
                <input type = "date" onChange = {(e)=> {setbirth(moment(e.target.value).format('YYYYMMDD'))}}/>

                <label>학과</label>
                <select onChange = {departmentHandler}>
                    {depList}
                </select>

                <label>Password</label>
                <input type = "password" value = {Password} onChange = {PasswordHandler}/>

                <label>PasswordConfrim</label>
                <input type = "Password" value = {PasswordConfrim} onChange = {PasswordConfrimHandler}/>
                <br/>
                <button type = "submit">회원가입</button>
            </form>
            </div>
    )
}

export default RegisterPage
