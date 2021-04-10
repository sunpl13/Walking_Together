import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

import { deleteNotice } from '../../modules/notice';
import '../../styles/admin.scss';

const NoticeDetail = ({match}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const noticeId = match.params.noticeId;

    const notice = useSelector(state => state.noticeReducer.selectedNotice);

    //action
    const delNotice = async() => {              //공지글 삭제
        const delConfirm = window.confirm("삭제하시겠습니까?");
        if (delConfirm === true) {
            await dispatch(deleteNotice(noticeId))
            .then(()=>history.push('/admin/notice'))
        }
    }

    const goUpdate = async() => {
        history.push('/admin/notice-update')
    }

    return (
        <div id="noticeDetail">
            <button onClick={goUpdate} className="admin_btn_blue">수정</button>
            <button onClick={delNotice} className="admin_btn_gray">삭제</button>

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
                {notice.attachedFiles[0]===undefined ? <p id="at_none">첨부파일이 없습니다.</p>
                : notice.attachedFiles.map((file, index) => {
                    return (
                        <div key={index}>
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