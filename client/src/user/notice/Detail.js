import React,{useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { debounce } from "lodash";

import {selectNotice} from '../../modules/notice';
import TopBar from '../../utils/TopBar';

import ReactHtmlParser from 'react-html-parser';

function Detail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    let view = useSelector(state => state.noticeReducer.selectedNotice);

    useEffect(() => {
        dispatch(selectNotice(location.state.noticeId));
    },[dispatch, location.state.noticeId]);

    //param function
    const goBack = debounce(() => {
        history.goBack();
    }, 800);

    return (
        <div>
            <header>
                <TopBar 
                    left="null" 
                    center={{title : view.title, data : view.createTime}} 
                    right="cancel" 
                    lfunc={null}
                    rfunc={goBack}
                    size="big"/>
            </header>
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
        </div>
    );
};

export default Detail;