import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

import { deleteNotice } from '../../modules/notice';
import '../../styles/admin.scss';

const NoticeDetail = ({match}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const noticeId = match.params.noticeId;

    const [timer, setTimer] = useState(0); // 디바운싱 타이머

    const notice = useSelector(state => state.noticeReducer.selectedNotice);

    //action
    const delNotice = useCallback(async() => {              //공지글 삭제
        // 디바운싱
        if (timer) {
            clearTimeout(timer);
        }
        
        const newTimer = setTimeout(async () => {
            try {
                const delConfirm = window.confirm("삭제하시겠습니까?");
                if (delConfirm === true) {
                    await dispatch(deleteNotice(noticeId))
                    .then(()=> history.push('/admin/notice'));
                }
            } catch (e) {
            console.error('error', e);
            }
        }, 800);
        
        setTimer(newTimer);
    },[dispatch, history, noticeId, timer]);

    const goUpdate = useCallback(async() => {
        // 디바운싱
        if (timer) {
            clearTimeout(timer);
        }
        
        const newTimer = setTimeout(async () => {
            try {
                history.push('/admin/notice-update');
            } catch (e) {
                console.error('error', e);
            }
        }, 800);
        
        setTimer(newTimer);
    }, [history, timer]);

    return (
        <div id="noticeDetail">
            <span className="buttonSet">
                <button onClick={goUpdate} className="admin_btn_blue">수정</button>
                <button onClick={delNotice} className="admin_btn_gray">삭제</button>
            </span>

            <div id="title">{notice.title}</div>
            <div id="date">{notice.createTime}</div>

            <div id="content">
                <div id="image">
                    {notice.imageFiles[0]===undefined ? null
                    : <img src={notice.imageFiles[0]} alt="error"></img>}
                </div>
                {ReactHtmlParser(notice.content)}
            </div>
            <div id="attachedFile">
                <p id="at_title">첨부파일</p>
                {notice.attachedFiles===null ? <p id="at_none">첨부파일이 없습니다.</p>
                : notice.attachedFiles.map((file, index) => {
                    return (
                        <div key={index} className="filedown">
                            <a href={file} download>{index+1}파일다운</a>
                            <br />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default NoticeDetail;