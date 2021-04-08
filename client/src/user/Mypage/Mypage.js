import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import {logoutHandler} from '../../modules/user';
import {useDispatch} from 'react-redux'
import axios from 'axios';
import { FcLike } from "react-icons/fc";
import { department } from "../../utils/options";
import { getPartnerBriefInfo } from '../../modules/partner';

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
            password2: '',
            profilePicture: []
        }
    );

    //state
    const [dept, setDept] = useState("")
    const [profilePicture, setProfilePicture] = useState([])
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    useEffect(() => {
        getMypage();
        return () => {}
    }, [])
    
    //회원 정보 가져오기
    const getMypage = async() => {
        await axios.get(`/mypage?stdId=${stdId}`)
        .then((res) => {
            if(res.data.status===200) {
                setUserInfo(res.data.data)
                setDept(res.data.data.department)
            } else if(res.data.status===400) {
                console.log("일치하는 회원이 없습니다.")
            }
        })
    }

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

    //파트너로 이동
    const goPartner = async() => {
        await dispatch(getPartnerBriefInfo(stdId))  //GET PARTNER-LIST
        .then(() => history.push('/partner'))
    }

    //개인정보 업데이트 취소
    const cancel = async() => {
        await reset()
        .then(() => {
            setUpdateState(false)
        })
    }

    //업데이트 상태 리셋
    const reset = async() => {
        setPassword1("")
        setPassword2("")
        setProfilePicture([])
    }

    //개인정보 업데이트 제출
    const submit = (e) => {
        e.preventDefault();

        if(password1!==password2) {
            alert("비밀번호 확인이 일치하지 않습니다.")
        } else {
            //create formdata
            const formData = new FormData();
            formData.append("stdId", stdId);
            formData.append("password", password1);
            formData.append("department", dept);
            if(profilePicture[0]!==undefined) {
                formData.append("profilePicture", profilePicture[0]);
            }

            axios.post(`/mypage/change`, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then(async(res) => {
                if(res.data.status===200) {
                    alert("회원 정보 수정 완료")
                    await getMypage()
                    .then(() => setUpdateState(false))
                } else if(res.data.status===400) {
                    console.log("일치하는 회원이 없습니다.")
                    setUpdateState(false)
                }
            })
        }
    }

    return (
        <div>
            {updateState===false ?
                <div>
                    <table> {/* default */}
                        <tbody>

                            <tr> {/* profile image */}
                                <td rowSpan="5">
                                    { userInfo.profilePicture!=null ? 
                                    <img src={userInfo.profilePicture} alt="프로필 이미지"/>
                                    : <FcLike/>
                                    }
                                </td>
                                <td>{userInfo.name}</td>
                            </tr>

                            <tr> {/* department */}
                                <td>{userInfo.department}</td>
                            </tr>

                            <tr> {/* student id */}
                                <td>{stdId}</td>
                            </tr>

                            <tr> {/* total time */}
                                <td>
                                    { userInfo.totalTime!=null ?
                                    userInfo.totalTime : 0 }시간
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button onClick={() => setUpdateState(true)}>회원 정보 수정</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                :
                <div> {/* update */}
                    <form action="/mypage/change" encType="multipart/form-data" method="post" onSubmit={(e) => submit(e)}>

                        {/* profile image */}
                        <label>프로필 이미지</label>
                        <input type="file" name="profilePicture" accept="image/*" onChange={(e) => setProfilePicture(e.target.files)}></input>
                        <br />

                        {/* department */}
                        <label>학과</label>
                        <select value={dept} name="department" onChange = {(e) => setDept(e.target.value)}>
                            {department.map((dept) => {
                                return (<option key={dept.label} value={dept.value}>{dept.label}</option>)
                            })}
                        </select><br />

                        {/* password1 */}
                        <label>비밀번호</label>
                        <input type="password" name="password1" value={password1} onChange={(e) => setPassword1(e.target.value)}></input>
                        <br />
                        
                        {/* password2 */}
                        <label>비밀번호 확인</label>
                        <input type="password" name="password2" value={password2} onChange={(e) => setPassword2(e.target.value)}></input>
                        <br />
                        
                        <p onClick={cancel}>취소</p>
                        <button type="submit">완료</button>
                    </form>
                </div>
            }

            {updateState===false ?
            <div>
                <p onClick={goPartner}>파트너 정보</p>
                <Link to='/certification'>인증서 발급</Link><br/>
                <Link to='/secession'>탈퇴하기</Link>
                <button onClick = {logout}>Logout</button>
            </div>
            : null}
        </div>
    )
}

export default Mypage;