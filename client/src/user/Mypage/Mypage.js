import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { logoutHandler } from "../../modules/user";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { debounce } from "lodash";

import { CgProfile } from "react-icons/cg";
import { ImProfile } from "react-icons/im";
import { CgFileDocument } from "react-icons/cg";

import { department } from "../../utils/options";
import { resetActivity } from "../../modules/activity";
import { resetFeed } from "../../modules/feed";
import { resetNotice } from "../../modules/notice";
import { getPartnerBriefInfo, resetPartner } from "../../modules/partner";
import { changeBar } from "../../modules/topbar";
import Comment from "../../utils/Comment";

import "../../styles/mypage.scss";

const Mypage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_SERVER;
  
  const stdId = useSelector((state) => state.user.authResult.stdId);
  const [updateState, setUpdateState] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    department: "",
    totalTime: 0,
    password1: "",
    password2: "",
    profilePicture: "",
  });
  const [fileUrl, setFileUrl] = useState("");

  //state
  const [dept, setDept] = useState("");
  window.getDept = function () {
    return dept;
  };
  const [profilePicture, setProfilePicture] = useState([]);
  window.getProfilePicture = function () {
    return profilePicture[0];
  };
  const [password1, setPassword1] = useState("");
  window.getPassword1 = function () {
    return password1;
  };
  const [password2, setPassword2] = useState("");
  window.getPassword2 = function () {
    return password2;
  };
  
  //회원 정보 가져오기
  const getMypage = useCallback(async () => {
    await axios
      .get(`${url}/mypage?stdId=${stdId}`, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}` 
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setUserInfo(res.data.data);
          setDept(res.data.data.department);
        } else if (res.data.status === 400) {
          console.log("일치하는 회원이 없습니다.");
        }
      });
  }, [stdId, url]);

  //로그아웃 구현
  const logout = debounce(() => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      dispatch(resetPartner());
      dispatch(resetActivity());
      dispatch(resetFeed());
      dispatch(resetNotice());
      dispatch(logoutHandler());
      if (window.confirm("로그아웃이 완료 되었습니다.")) {
        history.replace("/login");
      }
    }
  }, 800);

  //파트너로 이동
  const goPartner = debounce(() => {
    dispatch(getPartnerBriefInfo(stdId)); //GET PARTNER-LIST
    history.replace("/user/partner");
  }, 800);

  //프로필 사진 업데이트
  const changeImg = (files) => {
    const reader = new FileReader();
    const file = files[0];
    setProfilePicture(files);
    reader.onloadend = () => {
      setFileUrl(reader.result);
    }
    reader.readAsDataURL(file);
  };

  //업데이트 상태 리셋
  const reset = useCallback(async () => {
    setPassword1("");
    setPassword2("");
    setProfilePicture([]);
  }, []);

  //개인정보 업데이트 취소
  const cancel = debounce(async () => {
    await reset().then(() => {
      setUpdateState(false);
    });
    dispatch(
      changeBar(
        "null",
        { title: "마이페이지", data: null },
        "null",
        "null",
        "null",
        "h300"
      )
    ); //상단바 변경
  }, 800);

  //개인정보 업데이트 제출
  const submit = debounce((e) => {
    e.preventDefault();

    if (window.getPassword1() !== window.getPassword2()) {
      alert("비밀번호 확인이 일치하지 않습니다.");
    } else {
      //create formdata
      const formData = new FormData();
      formData.append("stdId", stdId);
      if (window.getPassword1() !== "") {
        formData.append("password", window.getPassword1());
      }
      formData.append("department", window.getDept());
      if (window.getProfilePicture() !== undefined) {
        formData.append("profilePicture", window.getProfilePicture());
      }

      axios
        .post(`${url}/mypage/change`, formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(async () => {
          alert("회원 정보 수정 완료");
          await getMypage()
            .then(() => {
              setUpdateState(false);
              dispatch(
                changeBar(
                  "null",
                  { title: "마이페이지", data: null },
                  "null",
                  "null",
                  "null",
                  "h300"
                )
              ); //상단바 변경
            })
            .catch((err) => {
              if (err.response.data.code === 400) {
                console.log(err.response.data.message);
                setUpdateState(false);
              }
            });
        });
    }
  }, 800);

  const setState = () => {
    dispatch(
      changeBar(
        "cancel",
        { title: "정보 수정", data: null },
        "create",
        cancel,
        (e) => submit(e),
        "h250"
      )
    ); //상단바 변경
    setUpdateState(true);
  };

  useEffect(() => {
    dispatch(
      changeBar(
        "null",
        { title: "마이페이지", data: null },
        "null",
        "null",
        "null",
        "h350"
      )
    ); //상단바 변경
    getMypage();
  }, [stdId, getMypage, dispatch]);

  return (
    <div id="profileWrap">
      {updateState === false ? (
        <div id="profile">
          <div id="profileImage">
            {userInfo.profilePicture != null ? (
              <img src={userInfo.profilePicture} alt="프로필 이미지" />
            ) : (
              <CgProfile size={120} color="#ffffff" />
            )}
          </div>
          <Comment sub="" main={userInfo.name+"\n"+userInfo.department+"\n"+stdId}/>
          <button id="updateInfo" onClick={() => setState(true)}>회원 정보 수정</button>
          <div id="time">
            {userInfo.totalTime !== 0 ? 
              "총 "+userInfo.totalTime+"분 활동했어요!"
              : "아직 기록이 없어요!"}
          </div>
        </div>
      ) : (
        <div id="mypageUpdate">
          {/* update */}
          <Comment sub="P r o f i l e" main={"내 정보를\n수정해요."}/>
          <form
            action="/mypage/change"
            id="mypageForm"
            encType="multipart/form-data"
            method="post"
            onSubmit={(e) => submit(e)}
          >
            <div className="mypageInputWrap" id="profileImage">
              <div id="preview">
                {fileUrl||userInfo.profilePicture != null ? (
                  <img src={fileUrl||userInfo.profilePicture} alt="프로필 이미지" />
                ) : (
                  <CgProfile size={150} color="#9a9a9a" />
                )}
              </div>
              <div id="inputDiv">
                <label id="fileBtn" htmlFor="inputFile">새로운 이미지 선택</label>
                <input
                  className="inputFile"
                  id="inputFile"
                  type="file"
                  name="profilePicture"
                  accept="image/*"
                  onChange={(e) => {
                    changeImg(e.target.files)
                  }}
                ></input>
              </div>
            </div>
            <br />

            <div className="mypageInputWrap">
              <select
                className="inputSelect"
                value={dept}
                name="department"
                onChange={(e) => setDept(e.target.value)}
              >
                {department.map(({ label, value }) => {
                  return (
                    <option key={label} value={value}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>
            <br />

            <div className="mypageInputWrap">
              <input
                className="pass1"
                type="password"
                name="password1"
                value={password1}
                placeholder="비밀번호"
                onChange={(e) => setPassword1(e.target.value)}
              ></input>
            </div>
            <br />

            <div className="mypageInputWrap">
              <input
                className="pass2"
                type="password"
                name="password2"
                value={password2}
                placeholder="비밀번호 확인"
                onChange={(e) => setPassword2(e.target.value)}
              ></input>
            </div>
            <br />
          </form>
        </div>
      )}

      {updateState === false ? (
        <div id="mypageList">
          <table onClick={goPartner} id="partner">
            <tbody>
              <tr><td><ImProfile id="icon" size={40} color="#477ac7"/></td><td id="right">파트너<br/>정보</td></tr>
            </tbody>
          </table>
          <table onClick={() => history.replace("/user/certification")} id="certification">
           <tbody>
              <tr><td><CgFileDocument id="icon" size={40} color="#477ac7"/></td><td id="right">인증서<br/>발급</td></tr>
            </tbody>
          </table>
          <p id="logout" onClick={()=>logout()}>로그아웃</p>
        </div>
      ) : null}
    </div>
  );
};

export default Mypage;
