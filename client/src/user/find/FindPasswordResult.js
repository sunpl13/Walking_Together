import React from 'react'
import { useHistory, useLocation } from 'react-router'

function FindPasswordResult() {

    const history = useHistory();
    const location = useLocation();
    console.log(location);

    return (
        <div>
            <span>{location.state.email}</span>
            <br/>
            <span>메일로 발송된 임시비밀번호로 로그인 해주세요</span>
            <br/>
            <br/>
            <br/>
            <span>로그인 후 반드시 비밀번호를 변경해주세요!</span>

            
            <button onClick = {() => {history.push('/login')}}>로그인하러 가기</button>
        </div>
    )
}

export default FindPasswordResult
