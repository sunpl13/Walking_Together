import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { selectNotice, deleteNotice } from '../../modules/notice';

const NoticeDetail = ({match}) => {
    const dispatch = useDispatch();
    const noticeId = match.params.noticeId;

    const [notice,setNotice] = useState({});
    
    useEffect(() => {
        const res = selNotice();
        setNotice(res)
    },[noticeId])

    //action
    const selNotice = async () => {
        await dispatch(selectNotice(noticeId))
        const state = await useSelector(state => state.notice.selectedNotice)
        return state
    }

    const delNotice = () => {
        dispatch(deleteNotice(noticeId))
    }

    return (
        <div>
            <button><Link to="/admin/notice-action?type=update">수정</Link></button>
            <button onClick={delNotice}>삭제</button>

            <h3>{notice.title}</h3>
            <h4>{notice.createTime}</h4>
            <p>{notice.content}</p>
            {notice.attachedFiles.map((file) => {
                return (<a href={file}></a>)
            })}
        </div>
    );
};

export default NoticeDetail;