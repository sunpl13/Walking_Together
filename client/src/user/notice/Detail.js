import React,{useEffect, useState} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {selectNotice} from '../../modules/notice';
import TopBar from '../../utils/TopBar';

import ReactHtmlParser from 'react-html-parser';

function Detail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [timer, setTimer] = useState(0); // 디바운싱 타이머

    let view = useSelector(state => state.noticeReducer.selectedNotice);

    useEffect(() => {
        dispatch(selectNotice(location.state.noticeId));
    },[dispatch, location.state.noticeId]);

    //param function
    function goBack() {
        // 디바운싱
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(async () => {
            try {
                history.goBack();
            } catch (e) {
                console.error('error', e);
            }
        }, 800);

        setTimer(newTimer);
    };

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