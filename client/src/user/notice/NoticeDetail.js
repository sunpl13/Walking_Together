import { React } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectNotice } from "../../modules/notice";
import  "../../styles/accordion.scss";

import ReactHtmlParser from "react-html-parser";
import { debounce } from "lodash";

function NoticeDetail({title, active, setactive, content, noticeId}) {
  const history = useHistory();
  const dispatch = useDispatch();

  const toggleHandler = debounce(() => {       //같은 콘텐츠 클릭시 화면 지우기 구현
    setactive(title);
    if (active === title) {
      setactive("");
    }
  }, 200);

  const goDetail = debounce(async(noticeId) => {
    await dispatch(selectNotice(noticeId))
    .then(() => {
      history.replace({
        pathname : '/user/viewdetail',
        state : {noticeId : noticeId}
      });
    });
  }, 800);

  return (
    <div className = "accordion">
      <div className = "accordionHeading">
        <div className = "container" >
          <p onClick = {() => goDetail(noticeId)}>{title}</p>
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