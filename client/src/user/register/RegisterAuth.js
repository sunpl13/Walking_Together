import React, {useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import { debounce } from "lodash";

import '../../styles/register.scss';
import TopBar from '../../utils/TopBar';

function RegisterAuth() {
    const location = useLocation();
    const history = useHistory();

    const [authNum, setauthNum] = useState("");


    //인증번호를 통한 본인인증
    const identificationHandler = debounce(() => {
        if(location.state.state.authNum === authNum) {
            if(window.confirm("본인 인증이 완료 되었습니다.")) {
                history.push({
                    pathname : '/register',
                    state : {email : location.state.email}
                });
            }
        } else {
            alert("인증번호가 일치하지 않습니다.");
        }
    }, 800);

    const onChangeHandler = e => {
        setauthNum(e.target.value);
    };

    return (
        <>
        <header>
        <TopBar
            left="null" 
            center={{title:"회원가입", data:null}} 
            right="null" 
            lfunc={null}
            rfunc={null}
            size="small"/>
            </header>
        <div className = "register_auth">
           <p>메일로 발송된 인증 코드를 입력해 주세요.</p>
            <div className = "e_container">
                <span>" {location.state.email} "</span>
            </div>
 
            <div className = "email_container">
                <input type="text" onChange = {onChangeHandler} placeholder = "인증번호"/>
                <button onClick = {identificationHandler}>인증</button>
            </div>
        </div>
    </>
    );
};

export default RegisterAuth;