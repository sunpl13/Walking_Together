import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkPartnerDetail } from "../../utils/Function";
import { debounce } from "lodash";

import "../../styles/activity.scss";
import { changeBar } from "../../modules/topbar";
import Comment from "../../utils/Comment";

import Notifications_Flatline from "../../source/Notifications_Flatline.svg";

const CreateActivity = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const partners = useSelector(state => state.activityReducer.partner);
  const [partnerId, setPartnerId] = useState(0);

  //param function
  const goBack = debounce(() => {
    history.replace("/user/activitystart");
  }, 800);

  const createActivity = debounce((partnerId) => {  //사진과 한 번에 보내야 하므로 일단 로컬스토리지에 저장
    if (partnerId === 0) {
      alert("파트너를 선택해주세요.");
    } else {
      const res = window.confirm("등록하시겠습니까?");
      if (res) {
        localStorage.setItem("partnerId", partnerId);
        history.replace("/user1/activity-register");
      } else {
        return;
      }
    }
  }, 800);

  useEffect(() => {
    dispatch(
      changeBar(
        "cancel", 
        { title: "활동 생성", data: null }, 
        "create", 
        goBack, 
        () => createActivity(partnerId),
        "h400"
      )
    );  //상단바 변경
  }, [partnerId, createActivity, dispatch, goBack])

  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth()+1).toString();
  const date = today.getDate().toString();

  return (
    <div id="create_activity">
      <Comment sub="T o d a y" main={year+"년\n"+month+"월 "+date+"일"}/>

      <form className="create_activity_form">
      <p id="comment">어떤 파트너와 활동할까요?</p>
        <div id="create_activity_wrap">
          <select className="inputSelect" onChange={(e) => setPartnerId(e.target.value)}>
            <option value={0}>선택</option>
            { partners.length !== 0 ?
              partners.map((partner) => {
                return (
                  <option key={partner.partnerId} value={partner.partnerId}>
                    {partner.partnerName}({checkPartnerDetail(partner.partnerDetail)})
                  </option>
                  )
              })
            :
              <option>파트너 없음</option>
            }
          </select>
        </div>
      </form>
      <img src={Notifications_Flatline} height="250" width="250" id="bottom_svg" alt="walking"></img>
    </div>
  );
};

export default CreateActivity;