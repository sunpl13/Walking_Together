import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

import { deleteNotice } from '../../modules/notice';

const NoticeDetail = ({match}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const noticeId = match.params.noticeId;

    const notice = useSelector(state => state.noticeReducer.selectedNotice);

    //action
    const delNotice = async() => {              //공지글 삭제
        const delConfirm = window.confirm("삭제하시겠습니까?");
        if (delConfirm == true) {
            await dispatch(deleteNotice(noticeId))
            .then(()=>history.push('/admin/notice'))
        }
    }

    return (
        <div>
            <button><Link to="/admin/notice-action/update">수정</Link></button>
            <button onClick={delNotice}>삭제</button>

            <h3>{notice.title}</h3>
            <h4>{notice.createTime}</h4>
            <p>{ReactHtmlParser(notice.content)}</p>
            {notice.attachedFiles[0]==undefined ? null 
            : notice.attachedFiles.map((file) => {
                return (
                    <div>
                        <a href={file} download>첨부파일다운</a>
                        <br />
                    </div>
                    )
            })}
        </div>
    );
};

export default NoticeDetail;