import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import '../../styles/find.scss';
import { debounce } from "lodash";
import { changeBar } from '../../modules/topbar';

const FindPasswordResult = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();

    const goLogin = debounce(() => {
        history.push('/login')        
    }, 800);

    useEffect(() => {
        dispatch(changeBar("null", {title:"비밀번호 찾기", data:null}, "null", "null", "null", "small"));  //상단바 변경
    }, [dispatch]);

    return (
        <div className = "find_auth">
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