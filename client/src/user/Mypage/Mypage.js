import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import {logoutHandler} from '../../modules/user';
import {useDispatch} from 'react-redux'
import axios from 'axios';

import { CgProfile } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";

import { department } from "../../utils/options";
import { getPartnerBriefInfo } from '../../modules/partner';
import TopBar from '../../utils/TopBar';

import '../../styles/mypage.scss';

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
    
    //회원 정보 가져오기
    const getMypage = useCallback(async() => {
        await axios.get(`/mypage?stdId=${stdId}`,{headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}})
        .then((res) => {
            if(res.data.status===200) {
                setUserInfo(res.data.data)
                setDept(res.data.data.department)
            } else if(res.data.status===400) {
                console.log("일치하는 회원이 없습니다.")
            }
        })
    },[stdId])

    //로그아웃 구현
    const logout = useCallback(() => { 
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
    },[stdId, dispatch, history])

    //파트너로 이동
    const goPartner = useCallback(async() => {
        await dispatch(getPartnerBriefInfo(stdId))  //GET PARTNER-LIST
        .then(() => history.push('/user/partner'))
    },[stdId, dispatch, history])

    //업데이트 상태 리셋
    const reset = useCallback(async() => {
        setPassword1("")
        setPassword2("")
        setProfilePicture([])
    },[])

    //개인정보 업데이트 취소
    const cancel = useCallback(async() => {
        await reset()
        .then(() => {
            setUpdateState(false)
        })
    },[reset])

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
                    'content-type': 'multipart/form-data',
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
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

    useEffect(() => {
        getMypage();
    }, [stdId, getMypage, reset])

    return (
        <div id="profileWrap">
            <header>
                <TopBar
                    left="null" 
                    center={{title:"마이페이지", data:null}} 
                    right="null" 
                    lfunc={null}
                    rfunc={null}
                    size="small"/>
            </header>
            {updateState===false ?
                <div>
                    <table id="profileTable">
                        <tbody>
                            <tr>
                                <td rowSpan="4" className="td1">
                                    {userInfo.profilePicture!=null?<img src={userInfo.profilePicture} alt="프로필 이미지"/>:<CgProfile size={100} color="#9a9a9a"/>}
                                </td>
                                <td className="td2">{userInfo.name}</td>
                            </tr>
                            <tr>
                                <td className="td2">{userInfo.department}</td>
                            </tr>
                            <tr>
                                <td className="td2">{stdId}</td>
                            </tr>
                            <tr>
                                <td className="td2">
                                    {userInfo.totalTime!=null?userInfo.totalTime:0}시간
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                :
                <div id="mypageUpdate"> {/* update */}
                    <header>
                        <TopBar
                            left="cancel" 
                            center={{title:"정보 수정", data:null}} 
                            right="create" 
                            lfunc={cancel}
                            rfunc={(e) => submit(e)}
                            size="small"/>
                    </header>
                    <form action="/mypage/change" id="mypageForm" encType="multipart/form-data" method="post" onSubmit={(e) => submit(e)}>

                        <div className="mypageInputWrap" id="profileImage">
                            <label>프로필 이미지</label>
                            <input className="inputFile" type="file" name="profilePicture" accept="image/*" onChange={(e) => setProfilePicture(e.target.files)}></input>
                        </div>
                        <br />

                        <div className="mypageInputWrap">
                            <label>학과</label>
                            <select className="inputSelect" value={dept} name="department" onChange = {(e) => setDept(e.target.value)}>
                                {department.map((dept) => {
                                    return (<option key={dept.label} value={dept.value}>{dept.label}</option>)
                                })}
                            </select>
                        </div>
                        <br />

                        <div className="mypageInputWrap">
                            <label>비밀번호</label>
                            <input className="input" type="password" name="password1" value={password1} onChange={(e) => setPassword1(e.target.value)}></input>
                        </div>
                        <br />
                        
                        <div className="mypageInputWrap">
                            <label>비밀번호 확인</label>
                            <input className="input" type="password" name="password2" value={password2} onChange={(e) => setPassword2(e.target.value)}></input>
                        </div>
                        <br />
                    </form>
                </div>
            }

            {updateState===false ?
            <table id="mypageList">
                <tbody>
                    <tr onClick={goPartner}>
                        <td>파트너 정보</td>
                        <td><IoIosArrowForward/></td>
                    </tr>
                    <tr onClick={() => history.push('/user/certification')}>
                        <td>인증서 발급</td>
                        <td><IoIosArrowForward/></td>
                    </tr>
                    <tr onClick={() => setUpdateState(true)}>
                        <td>회원 정보 수정</td>
                        <td><IoIosArrowForward/></td>
                    </tr>
                    <tr id="logout" onClick = {logout}>
                        <td>로그아웃</td>
                        <td><IoIosArrowForward/></td>
                    </tr>
                </tbody>
            </table>
            : null}
        </div>
    )
}

export default Mypage;