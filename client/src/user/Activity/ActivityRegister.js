import { React, useState, useRef, useEffect } from "react";
import { createActivity } from "../../modules/activity";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";
import { changeBar } from "../../modules/topbar";
import Comment from "../../utils/Comment";

import "../../styles/activity.scss";

const ActivityRegister = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const stdId = useSelector(state => state.user.authResult.stdId);
  const partnerId = localStorage.getItem("partnerId");
  localStorage.setItem("activityId",useSelector(state => state.activityReducer.activity.activityId));
  const [state, setState] = useState(true);  //제어

  const [picture, setPicture] = useState([]);
  const [buttonFirst, setButtonFirst] = useState(true);

  const camera = useRef();
  const frame = useRef();

  //사진 촬영
  const takePhoto = (e) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        frame.current.src = base64;
      }
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // 파일을 버퍼에 저장
      setPicture(e.target.files[0]); // 파일 상태 업데이트
      setButtonFirst(false);
    }
  };

  //param function
  const goBack = debounce(() => {  //뒤로가기
    if (window.confirm("취소하시겠습니까?")) {
      localStorage.removeItem("partnerId");
      localStorage.removeItem("activityId");
      history.replace("/user1/createactivity");
    }
  }, 800);

  const createAction = debounce((e) => {  //등록
    e.preventDefault();
    setState(false);

    if (picture.length === 0) {
      alert("사진 촬영 후 활동 등록이 가능합니다.");
      setState(true);
    } else {
      submit();
    }
  }, 800);

  const submit = async() => {
    //create formdata
    const formData = new FormData();
    formData.append("stdId", stdId);
    formData.append("partnerId", partnerId);
    formData.append("startPhoto", picture);

    await dispatch(createActivity(formData))
    .then(() => history.replace("/user1/activity"));
  };

  useEffect(() => {
    if (state === true) {
      dispatch(
        changeBar(
          "cancel", 
          { title: "사진 등록", data: null }, 
          "create", 
          goBack, 
          createAction, 
          "h400"
        )
      );
    } else {
      dispatch(
        changeBar(
          "cancel", 
          {
            title: "사진 등록", 
            data: null
          }, 
          "create", 
          goBack, 
          null, 
          "h400"
        )
      );
    }
  }, [goBack, createAction, dispatch, state]);


  return (
    <div id="activityRegisterWrap" >
      <Comment sub="S t a r t" main={"파트너와\n사진을 찍어요!"}/>

      <div id="activityRegister">
        <div className = "picture_container">
          { picture.length === 0 ?
            <div className="preview"></div>
          :
            <div className="preview">
              <img ref={frame} alt="none"/>
            </div>
          }
        </div>

        <div id="pictureInput">
          <form action="/activity/createActivity" className="imageForm" encType="multipart/form-data" method="post" onSubmit={(e) => createAction(e)}>
            <input type="file" accept="image/*" capture="camera" ref={camera} id="inputFile" onChange={takePhoto}/>

            { buttonFirst===true ? 
              <label htmlFor="inputFile" className="btn" id="btn1">사진 촬영</label>
            : 
              <label htmlFor="inputFile" className="btn" id="btn2">다시 촬영</label>
            }
            <br/>
            { picture.length === 0 ?
              <span className="filename" id="fileName1">선택된 사진 없음</span>
            : 
              <span className="filename" id="fileName2">{picture.name}</span>
            }
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActivityRegister;