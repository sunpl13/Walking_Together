<<<<<<< Updated upstream
import React from 'react'

function RegisterPage() {
=======
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


        
    const Email = location.state.email;
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

>>>>>>> Stashed changes
    return (
        <form>
            <input type = "text"/>
            <input type = "date"/>
           <Select/>
           <input type = "text"/>
           <label>연락처</label>
           <input type = "number"/>
           <button>회원가입</button>
        </form>
    )
}

export default RegisterPage
