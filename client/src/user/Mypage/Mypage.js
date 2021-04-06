import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import {logoutHandler} from '../../modules/user';
import {useDispatch} from 'react-redux'
import axios from 'axios';
import { FcLike } from "react-icons/fc";
import { department } from "../../utils/options";

const Mypage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const stdId = localStorage.getItem('user_info').replace(/"/g,"")
    const [updateState, setUpdateState] = useState(false)
    const [userInfo, setUserInfo] = useState(
        {
            name:'',
            department:'',
            totalTime: 0,
            password1: '',
            password2: ''
        }
    );

    useEffect(() => {
        axios.get(`/mypage?stdId=${localStorage.getItem('user_info').replace(/"/g,"")}`)
        .then((res) => {
            if(res.data.status===200) {
                setUserInfo(res.data.data)
            } else if(res.data.status===400) {
                console.log("일치하는 회원이 없습니다.")
            }
        })
    }, [stdId, updateState])

    

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

    //handler
    const changeHandler = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    //profile update submit action
    const submit = () => {
        axios.post(`/mypage/change`, {
            stdId: stdId,
            password: userInfo.password1,
            department: userInfo.department,
            profilePicture: userInfo.profilePicture
        }).then((res) => {
            if(res.data.status===200) {
                alert("회원 정보 수정 완료")
                setUpdateState(false)
            } else if(res.data.status===400) {
                console.log("일치하는 회원이 없습니다.")
            }
        })
    }

    return (
        <div>
            {updateState===false ?
                <table> {/* default */}
                    <tbody>

                        <tr> {/* profile image */}
                            <td rowSpan="5">
                                { userInfo.profilePicture!=null ? 
                                <img src={userInfo.profilePicture} alt="프로필 이미지"/>
                                : <FcLike/>
                                }
                            </td>
                            <td><p>{userInfo.name}</p></td>
                        </tr>

                        <tr> {/* department */}
                            <td><p>{userInfo.department}</p></td>
                        </tr>

                        <tr> {/* student id */}
                            <td><p>{stdId}</p></td>
                        </tr>

                        <tr> {/* total time */}
                            <td><p>
                                { userInfo.totalTime!=null ?
                                userInfo.totalTime : 0 }시간
                            </p></td>
                        </tr>

                        <tr>
                            <td>
                                <button onClick={() => setUpdateState(true)}>회원 정보 수정</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
                :
                <table> {/* update */}
                    <tbody>

                        <tr> {/* profile image */}
                            <td>
                                { userInfo.profilePicture!=null ? 
                                <img src={userInfo.profilePicture} alt="프로필 이미지"/>
                                : null
                                }
                            </td>
                        </tr>

                        <tr> {/* department */}
                            <td>
                                <select value={userInfo.department} name="department" onChange = {changeHandler}>
                                    {department.map((dept) => {
                                        return (<option key = {dept.label} value = {dept.value}>{dept.label}</option>)
                                    })}
                                </select>
                            </td>
                        </tr>

                        <tr> {/* password1 */}
                            <td>
                                <label>비밀번호</label>
                                <input type="password" name="password1" value={userInfo.password1} onChange={changeHandler}></input>
                            </td>
                        </tr>
                        <tr> {/* password2 */}
                            <td>
                                <label>비밀번호 확인</label>
                                <input type="password" name="password2" value={userInfo.password2} onChange={changeHandler}></input>
                            </td>
                        </tr>
                        <button onClick={() => setUpdateState(false)}>취소</button>
                        <button onClick={submit}>완료</button>

                    </tbody>
                </table>
            }

            {updateState===false ?
            <div>
                <Link to='/partner'>파트너 정보</Link>
                <Link to='/certification'>인증서 발급</Link>
                <Link to='/secession'>탈퇴하기</Link>
                <button onClick = {logout}>Logout</button>
            </div>
            : null}
        </div>
    )
}

export default Mypage;