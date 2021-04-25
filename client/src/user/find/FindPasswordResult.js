import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import '../../styles/find.scss';
import TopBar from '../../utils/TopBar';

function FindPasswordResult() {

    const history = useHistory();
    const location = useLocation();

    const [timer, setTimer] = useState(0); // 디바운싱 타이머

    const goLogin = () => {
        // 디바운싱
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(async () => {
            try {
                history.push('/login')
            } catch (e) {
                console.error('error', e);
            }
        }, 800);

        setTimer(newTimer);
    };

    return (
        <div className = "find_auth">
            <header>
                <TopBar
                    left="null" 
                    center={{title:"회원가입", data:null}} 
                    right="null" 
                    lfunc={null}
                    rfunc={null}
                    size="small"/>
            </header>
            <div className = "coment">
                <span>메일로 발송된 임시비밀번호로 로그인 해주세요.
                로그인 후 반드시 비밀번호를 변경해주세요!</span>
            </div>
            <div className = "e_container">
                <span>" {location.state.email} "</span>
            </div>
            <button className = "find_button" onClick = {goLogin}>로그인하러 가기</button>
        </div>
    );
};

export default FindPasswordResult;