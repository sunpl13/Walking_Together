import {React} from 'react';
import {useHistory} from 'react-router-dom';
import  '../../styles/accordion.scss';

function NoticeDetail({title, active, setactive, content, noticeId}) {
    const history = useHistory();

    const toggleHandler = () => {           //같은 콘텐츠 클릭시 화면 지우기 구현
        setactive(title);
        if(active === title) {
            setactive("")
        }
    }



    return (
        <div className = "accordion">
            <div className = "accordionHeading">
                <div className = "container" >
                    <p onClick = {() => {
                    history.push({
                        pathname : '/viewdetail',
                        state : {noticeId : noticeId}
                    })
                    }}>{title}</p>
                    <span id="toggle" onClick = {toggleHandler}>{active === title ? "X" : "|||"}</span>
                    <div className = "info">
                        </div>
                </div>
            </div>
            <div className = {(active === title ? "show" : "") + " accordionContent"}>
                <div className = "container">
                    <p>
                        {content}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NoticeDetail
