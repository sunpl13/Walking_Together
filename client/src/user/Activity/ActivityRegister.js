import { React, useState, useRef, useEffect } from 'react';
import { createActivity } from '../../modules/activity';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { debounce } from "lodash";
import { changeBar } from '../../modules/topbar';

import '../../styles/activity.scss';

const ActivityRegister = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const stdId = useSelector(state => state.user.isLogin.stdId);
    const partnerId = localStorage.getItem('partnerId');
    localStorage.setItem('activityId',useSelector(state => state.activityReducer.activity.activityId));

    const [picture, setPicture] = useState([]);
    const [buttonFirst, setButtonFirst] = useState(true);

    const camera = useRef();
    const frame = useRef();

    const takePhoto = (e) => {
        let reader = new FileReader();

        reader.onloadend = () => {
            const base64 = reader.result;
            if (base64) {
              frame.current.src=base64;
            }
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]); // 파일을 버퍼에 저장
            setPicture(e.target.files[0]); // 파일 상태 업데이트
            setButtonFirst(false);
        }
    };

    //param function
    const goBack = debounce(() => {
        localStorage.removeItem('partnerId');
        localStorage.removeItem('activityId');
        history.goBack();
    }, 800);

    const createAction = debounce((e) => {
        e.preventDefault();

        if(picture.length===0) {
            alert("사진 촬영 후 활동 등록이 가능합니다.");
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
        .then(() => history.push('/user1/activity'));
    };

    useEffect(() => {
        dispatch(changeBar("cancel", {title:"사진 등록", data:null}, "create", goBack, createAction, "small"));
    }, [goBack, createAction, dispatch]);


    return (
        <div id="activityRegisterWrap" >
            <div id="activityRegister">
                <div className = "picture_container">
                    {picture.length===0?
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

                        {buttonFirst===true ? 
                        <label htmlFor="inputFile" className="user_btn_blue">사진 촬영</label>
                        : <label htmlFor="inputFile" className="user_btn_blue">다시 촬영</label>
                        }
                        <br/>
                        {picture.length===0?
                        <span id="fileName">선택된 사진 없음</span>
                        : <span id="fileName">{picture.name}</span>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ActivityRegister;