import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";
import { CgProfile } from "react-icons/cg";

import Comment from "../../utils/Comment";
import { changeBar } from "../../modules/topbar";
import { checkPartnerDetail } from "../../utils/Function";
import {
  deletePartnerHandler,
  getPartnerBriefInfo,
} from "../../modules/partner";

const PartnerDetail = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const stdId = useSelector((state) => state.user.authResult.stdId);
  const partner = useSelector((state) => state.partner.partnerDetail);

  //state
  const [partnerId] = useState(match.params.partnerId);
  const [detail, setDetail] = useState("");

  //param function
  const goBack = debounce(() => {
    history.replace("/user/partner");
  }, 800);

  //go partner update
  const goPartnerUpdate = debounce(() => {
    history.replace(`/user/partner-update/${partnerId}`);
  }, 800);

  //delete partner
  const delPartner = debounce(async () => {
    await dispatch(deletePartnerHandler(partnerId)).then(() => {
      dispatch(getPartnerBriefInfo(stdId));
      history.replace("/user/partner");
    });
  }, 800);

  //useEffect
  useEffect(() => {
    dispatch(
      changeBar(
        "null",
        { title: partner.partnerName, data: null },
        "cancel",
        "null",
        goBack,
        "h550"
      )
    ); //상단바 변경
    setDetail(checkPartnerDetail(partner.partnerDetail));
  }, [partner, dispatch, goBack]);

  return (
    <div id="partner_detail">
      <Comment sub="P a r t n e r" main={detail+"이고,\n"+partner.gender+"이며,\n"+
      partner.partnerBirth.slice(0,4)+"년"+partner.partnerBirth.slice(5,7)+"월"+partner.partnerBirth.slice(8,10)+"일\n생이에요.\n"}/>
      <div className="partnerImage">
        {partner.partnerImage != null ? (
          <img src={partner.partnerImage} alt="파트너 이미지" />
        ) : (
          <CgProfile size={200} color="#ffffff" />
        )}
      </div>
      <div className="sets">
        <div className="set">
          <p className="title">파트너와의 관계?</p>
          <p className="content">{partner.relationship}</p>
        </div>
        <div className="set">
          <p className="title">파트너를 선정한 이유?</p>
          <p className="content">{partner.selectionReason}</p>
        </div>

        <div id="buttons">
        <button onClick={goPartnerUpdate} className="updateBtn">
          수정
        </button>
        <button onClick={delPartner} className="deleteBtn">
          삭제
        </button>
      </div>
      </div>
    </div>
  );
};

export default PartnerDetail;
