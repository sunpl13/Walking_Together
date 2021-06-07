import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import { debounce } from "lodash";
import '../../styles/register.scss';

import { changeBar } from '../../modules/topbar';

const RegisterAuth = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();


    const [authNum, setauthNum] = useState("");

    const isabled = authNum.length === 7;

    //인증번호를 통한 본인인증
    const identificationHandler = debounce(() => {
        if(location.state.state === authNum) {
            alert("본인 인증이 완료 되었습니다.");
            history.replace({
                pathname : '/user1/register',
                state : {email : location.state.email}
            });
        } else {
            alert("인증번호가 일치하지 않습니다.");
        }
    }, 800);

    const onChangeHandler = e => {
        setauthNum(e.target.value);
    };

    useEffect(() => {
        dispatch(changeBar("null", {title:"회원가입",data:null}, "null", "null", "null", "small"));  //상단바 변경
    }, [dispatch]);

    return (
        <div className = "register_auth">
           <p>메일로 발송된 인증 코드를 입력해 주세요.</p>
            <div className = "e_container">
                <span>" {location.state.email} "</span>
            </div>
 
            <div className = "email_container">
                <input type="number" onChange = {onChangeHandler} placeholder = "인증번호"/>
                <button className = {isabled ? "button1" : "button2"} disabled = {!isabled} onClick = {identificationHandler}>인증</button>
            </div>
        </div>
    );
};

export default RegisterAuth;