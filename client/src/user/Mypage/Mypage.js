import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import {logoutHandler} from '../../modules/user';
import {useDispatch} from 'react-redux'
import axios from 'axios';

const Mypage = () => {
    const history = useHistory();
    const stdId = localStorage.getItem('user_info');
    const [userInfo, setUserInfo] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/mypage?stdId=${stdId}`)
        .then((res) => setUserInfo(res.data))
    }, [])

    

    //로그아웃 구현
    const logout = () => { 
        if(!stdId){
            alert("데이터가 없습니다.")
        } else{
            if(window.confirm("로그아웃 하시겠습니까?")) {
                
            dispatch(logoutHandler());
            if(window.confirm("로그아웃이 완료 되었습니다.")) {
                history.push('/login');
            }
        }
    }
    }

    return (
        <div>
            <Link to='/update_info'>
                <table>
                    <tr>
                        <td rowspan="4"><img src={userInfo.profilePicture}/></td>
                        <td><p>{userInfo.name}</p></td>
                    </tr>
                    <tr>
                        <td><p>{userInfo.department}</p></td>
                    </tr>
                    <tr>
                        <td><p>{stdId}</p></td>
                    </tr>
                    <tr>
                        <td><p>{userInfo.totalTime}</p></td>
                    </tr>
                </table>
            </Link>

            <Link to='/partner'>파트너 정보</Link>
            <Link to='/certification'>인증서 발급</Link>
            <Link to='/secession'>탈퇴하기</Link>
            <button onClick = {logout}>Logout</button>
        </div>
    )
}

export default Mypage;