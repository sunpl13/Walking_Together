import React, {useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'

function RegisterAuth() {
    const location = useLocation();
    const history = useHistory();
    console.log(location.state);

    const [authNum, setauthNum] = useState("")


    //인증번호를 통한 본인인증
    const identificationHandler = () => {
        if(location.state.state.authNum === authNum) {
            if(window.confirm("본인 인증이 완료 되었습니다.")) {
                history.push({
                    pathname : '/register',
                    state : {email : location.state.email}
                });
            }
        } else {
            alert("인증번호가 일치하지 않습니다.")
        }
    }

    const onChangeHandler = e => {
        setauthNum(e.target.value)
    }

    return (
        <div>
            <span>{location.state.email}</span>
            <span>메일로 발송된 인증 코드를 입력해 주세요.</span>
            <input type="text" onChange = {onChangeHandler}/>
            <button onClick = {identificationHandler}>인증</button>
        </div>
    )
}

export default RegisterAuth
