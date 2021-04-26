import React,{useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { debounce } from "lodash";

import {selectNotice} from '../../modules/notice';
import { changeBar } from '../../modules/topbar';

import ReactHtmlParser from 'react-html-parser';

const Detail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    let view = useSelector(state => state.noticeReducer.selectedNotice);

    //param function
    const goBack = debounce(() => {
        history.goBack();
    }, 800);
    
    useEffect(() => {
        dispatch(changeBar("null", {title:view.title, data:view.createTime}, "cancel", "null", goBack, "big"));  //상단바 변경
        dispatch(selectNotice(location.state.noticeId));
    },[dispatch, location.state.noticeId, goBack, view]);

    return (
        <div id="notice">
            <div className = "thumbnail">
                {view.imageFiles.length!==0 ?
                <img src = {view.imageFiles} alt="noticeImage"/>
                : null }
            </div>
            <div className = "content">
                {ReactHtmlParser(view.content)}
            </div>
        </div>
    );
};

export default Detail;