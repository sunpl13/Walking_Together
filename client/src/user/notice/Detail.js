import React,{useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {selectNotice} from '../../modules/notice';

function Detail() {
    const dispatch = useDispatch();
    const location = useLocation();

    let view = useSelector(state => state.noticeReducer.selectedNotice);

    console.log(view)

    useEffect(() => {
        dispatch(selectNotice(location.state.noticeId))
    },[])

    return (
        <div>
            <div className = "head">
                제목{view.title}
                <br/>
                작성일 : {view.createTime}
            </div>
            <div className = "thumbnail">
               <img src = {view.imageFiles}/>
            </div>
            <div className = "content">
                {view.content}
            </div>
        </div>
    )
}

export default Detail
