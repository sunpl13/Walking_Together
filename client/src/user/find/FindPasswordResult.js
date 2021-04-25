import React from 'react'
import { useHistory, useLocation } from 'react-router'
import '../../styles/find.scss'
import MainContainer from '../../utils/MainContainer'

function FindPasswordResult() {

    const history = useHistory();
    const location = useLocation();
    console.log(location);

    return (
        <MainContainer header = {{
            left : "null",
            center : {title : "회원가입", data : null},
            right : "null" ,
            lfunc : () => null,
            rfunc : () => null,
            size :"small"
        }}>
            <div className = "find_auth">
                <div className = "coment">
                    <span>메일로 발송된 임시비밀번호로 로그인 해주세요.
                    로그인 후 반드시 비밀번호를 변경해주세요!</span>
                </div>
                <div className = "e_container">
                    <span>{location.state.email}</span>
                </div>
                <button className = "find_button" onClick = {() => {history.push('/login')}}>로그인하러 가기</button>
            </div>
        </MainContainer>
    )
}

export default FindPasswordResult
