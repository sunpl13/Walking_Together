import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";

import PartnerItem from "../Partner/PartnerItem";
import { changeBar } from "../../modules/topbar";
import Comment from "../../utils/Comment";

import "../../styles/partner.scss";

const Partner = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const partner = useSelector(state => state.partner.briefPartner.partnerList);  //PARTNER-LIST
  
  //param function
  const goBack = debounce(() => {
    history.replace("/user/mypage");
  }, 800);

  const goCreatePartner = debounce(() => {
    history.replace(`/user/partner-insert`);
  }, 800);

  useEffect(() => {
    dispatch(
      changeBar(
        "back", 
        { title: "파트너", data: null }, 
        "plus", 
        goBack, 
        goCreatePartner, 
        "h250"
      )
    );  //상단바 변경
  },[dispatch, goBack, goCreatePartner]);

  return (
    <div id="partnerWrap">
      <Comment sub="P a r t n e r" main={"내 파트너를\n확인해요!"}/>
      
      <div id="partner_table">
          { partner !== undefined ?
            partner.map((res) => {
              return (
                <PartnerItem state={res} key={res.partnerId}/>  //PARTNER-INFO-ITEM
              )
            })
          : 
            <p>파트너 정보가 없습니다.</p>
          }
      </div>
    </div>
  );
};

export default Partner;