import {React, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {selectNotice} from '../../modules/notice';
import  '../../styles/accordion.scss';

import ReactHtmlParser from 'react-html-parser';

function NoticeDetail({title, active, setactive, content, noticeId}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const [timer, setTimer] = useState(0); // 디바운싱 타이머

    const toggleHandler = () => {           //같은 콘텐츠 클릭시 화면 지우기 구현
        // 디바운싱
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(async () => {
            try {
                setactive(title);
                if(active === title) {
                    setactive("");
                }
            } catch (e) {
                console.error('error', e);
            }
        }, 800);

        setTimer(newTimer);
    };

    const goDetail = async(noticeId) => {
        // 디바운싱
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(async () => {
            try {
                await dispatch(selectNotice(noticeId))
                .then(() => {
                    history.push({
                        pathname : '/user/viewdetail',
                        state : {noticeId : noticeId}
                    })
                });
            } catch (e) {
                console.error('error', e);
            }
        }, 800);

        setTimer(newTimer);
    };

    return (
        <div className = "accordion">
            <div className = "accordionHeading">
                <div className = "container" >
                    <p onClick = {goDetail}>{title}</p>
                    <span id="toggle" onClick = {toggleHandler}>{active === title ? "X" : "|||"}</span>
                    <div className = "info"></div>
                </div>
            </div>
            <div className = {(active === title ? "show" : "") + " accordionContent"}>
                <div className = "container">
                    {ReactHtmlParser(content)}
                </div>
            </div>
        </div>
    );
};

export default NoticeDetail;