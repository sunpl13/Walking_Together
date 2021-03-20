import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { selectNotice, deleteNotice } from '../../modules/notice';

const NoticeDetail = ({match}) => {
    const dispatch = useDispatch();
    const noticeId = match.params;

    const notice = useSelector(state => state.notice.selectedNotice);
    
    useEffect(() => {
        dispatch(selectNotice(noticeId))  //공지글 불러오기
    },[noticeId])

    //action
    const delNotice = () => {              //공지글 삭제
        dispatch(deleteNotice(noticeId))
    }

    return (
        <div>
            <button><Link to="/admin/notice-action/update">수정</Link></button>
            <button onClick={delNotice}>삭제</button>

            <h3>{notice.title}</h3>
            <h4>{notice.createTime}</h4>
            <p>{notice.content}</p>
            {notice.attachedFiles.map((file) => {
                return (<a href={file}>첨부파일다운</a>)
            })}
        </div>
    );
};

export default NoticeDetail;