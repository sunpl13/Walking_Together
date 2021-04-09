import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

import { deleteNotice } from '../../modules/notice';
import '../../styles/admin-notice.scss';

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
        <div>
            <button onClick={goUpdate}>수정</button>
            <button onClick={delNotice}>삭제</button>

            <h3>{notice.title}</h3>
            <h4>{notice.createTime}</h4>

            {notice.imageFiles[0]===undefined ? null
            : <img src={notice.imageFiles[0]} alt="error"></img>}

            {ReactHtmlParser(notice.content)}
            {notice.attachedFiles[0]===undefined ? null 
            : notice.attachedFiles.map((file, index) => {
                return (
                    <div key={index}>
                        <a href={file} download>첨부파일다운</a>
                        <br />
                    </div>
                    )
            })}
        </div>
    );
};

export default NoticeDetail;